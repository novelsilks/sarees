import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import Razorpay from 'razorpay';

dotenv.config();

const app = express();
app.set('trust proxy', true);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, 'data');
const ordersFilePath = path.join(dataDirectory, 'orders.json');
const productsFilePath = path.join(dataDirectory, 'products.json');
const publicProductsDirectory = path.join(__dirname, 'public', 'products');
const distProductsDirectory = path.join(__dirname, 'dist', 'products');
const port = Number(process.env.PORT || 3001);
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;
const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
const googleSheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const googleSheetsSharedSecret = process.env.GOOGLE_SHEETS_SHARED_SECRET;
const publicApiBaseUrl = (process.env.PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
const adminPasswords = new Set(
  [
    process.env.ADMIN_PASSWORD,
    ...(process.env.ADMIN_PASSWORDS || '').split(','),
    'novelsilks-admin',
    'novelsilks',
  ]
    .map((password) => String(password || '').trim())
    .filter(Boolean),
);

const razorpay =
  keyId && keySecret
    ? new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      })
      : null;

const createMailTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

const ensureOrdersFile = async () => {
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    await fs.access(ordersFilePath);
  } catch {
    await fs.writeFile(ordersFilePath, '[]', 'utf8');
  }
};

const ensureProductsFile = async () => {
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    await fs.access(productsFilePath);
  } catch {
    await fs.writeFile(productsFilePath, '[]', 'utf8');
  }
};

const readProducts = async () => {
  await ensureProductsFile();
  const current = await fs.readFile(productsFilePath, 'utf8');
  const products = current.trim() ? JSON.parse(current) : [];
  return Array.isArray(products) ? products.map((product) => normalizeProduct(product)) : [];
};

const writeProducts = async (products) => {
  await ensureProductsFile();
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
};

const requireAdmin = (req, res, next) => {
  const token = req.get('authorization')?.replace(/^Bearer\s+/i, '') || '';

  if (!adminPasswords.has(token)) {
    return res.status(401).json({
      error: 'Admin password is required.',
    });
  }

  return next();
};

const normalizeProduct = (product, existingProduct = null) => {
  const gallery = Array.isArray(product.gallery)
    ? product.gallery.map((image) => String(image).trim()).filter(Boolean)
    : String(product.gallery || '')
        .split('\n')
        .map((image) => image.trim())
        .filter(Boolean);
  const searchTerms = Array.isArray(product.searchTerms)
    ? product.searchTerms.map((term) => String(term).trim()).filter(Boolean)
    : String(product.searchTerms || '')
        .split(',')
        .map((term) => term.trim())
        .filter(Boolean);
  const image = String(product.image || gallery[0] || existingProduct?.image || '').trim();
  const parsedStock = Number(product.stock ?? existingProduct?.stock ?? 2);

  return {
    id: Number(product.id || existingProduct?.id || Date.now()),
    category: String(product.category || existingProduct?.category || 'kanjivaram').trim(),
    name: String(product.name || existingProduct?.name || 'Untitled Product').trim(),
    price: String(product.price || existingProduct?.price || 'Rs. 0').trim(),
    stock: Number.isFinite(parsedStock) ? Math.max(0, Math.floor(parsedStock)) : 2,
    image,
    tag: String(product.tag || existingProduct?.tag || '').trim(),
    searchTerms,
    description: String(product.description || existingProduct?.description || '').trim(),
    gallery: gallery.length > 0 ? gallery : image ? [image] : [],
  };
};

const saveUploadedImage = async ({ fileName, dataUrl }) => {
  const match = String(dataUrl || '').match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/);

  if (!match) {
    throw new Error('Please upload a JPG, PNG, or WEBP image.');
  }

  const extension = match[1].split('/')[1].replace('jpeg', 'jpg');
  const safeBaseName = String(fileName || `product-${Date.now()}`)
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  const finalName = `${safeBaseName || 'product'}-${Date.now()}.${extension}`;
  const imageBuffer = Buffer.from(match[2], 'base64');
  const targetDirectories = [publicProductsDirectory, distProductsDirectory];

  await Promise.all(
    targetDirectories.map(async (directory) => {
      await fs.mkdir(directory, { recursive: true });
      await fs.writeFile(path.join(directory, finalName), imageBuffer);
    }),
  );

  return `/products/${finalName}`;
};

const saveOrderRecord = async (orderRecord) => {
  await ensureOrdersFile();
  const current = await fs.readFile(ordersFilePath, 'utf8');
  const orders = current.trim() ? JSON.parse(current) : [];
  orders.unshift(orderRecord);
  await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');
};

const syncOrderToGoogleSheets = async (orderRecord) => {
  if (!googleSheetsWebhookUrl) {
    return {
      synced: false,
      warning: 'Google Sheets webhook is not configured yet.',
    };
  }

  const webhookUrl = googleSheetsSharedSecret
    ? `${googleSheetsWebhookUrl}${googleSheetsWebhookUrl.includes('?') ? '&' : '?'}secret=${encodeURIComponent(googleSheetsSharedSecret)}`
    : googleSheetsWebhookUrl;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderRecord),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(responseText || 'Google Sheets sync failed.');
  }

  return {
    synced: true,
    message: responseText || 'Order synced to Google Sheets.',
  };
};

const formatOrderItemsForText = (items = []) => {
  if (!items.length) {
    return 'No item details were received with this order.';
  }

  return items
    .map((item, index) => {
      const details = [
        `${index + 1}. ${item.name || 'Unnamed product'}`,
        `Qty: ${item.quantity || 1}`,
        `Unit Price: ${item.unitPrice || 'NA'}`,
        `Total: ${item.price || item.lineTotal || 'NA'}`,
        `Category: ${item.category || 'NA'}`,
      ];

      if (item.productId) {
        details.push(`Product ID: ${item.productId}`);
      }

      return details.join(' | ');
    })
    .join('\n');
};

const sendOrderEmails = async (orderRecord) => {
  if (!gmailUser || !gmailAppPassword) {
    return;
  }

  const transporter = createMailTransporter();
  await transporter.verify();

  const orderLines = formatOrderItemsForText(orderRecord.items);
  const addressBlock = [
    orderRecord.customer.address,
    `${orderRecord.customer.city}, ${orderRecord.customer.state} - ${orderRecord.customer.pincode}`,
  ].join('\n');

  const result = {
    customerSent: false,
    ownerSent: false,
    warnings: [],
  };

  if (orderRecord.customer.email) {
    try {
      await transporter.sendMail({
        from: `"Novel Silks Orders" <${gmailUser}>`,
        to: orderRecord.customer.email,
        replyTo: gmailUser,
        subject: `Novel Silks order confirmed - ${orderRecord.orderReference}`,
        text: [
          `Dear ${orderRecord.customer.fullName || 'Customer'},`,
          '',
          'Thank you for shopping with Novel Silks. Your payment has been received successfully.',
          '',
          `Order ID: ${orderRecord.orderReference}`,
          `Payment ID: ${orderRecord.paymentId}`,
          `Amount Paid: ${orderRecord.orderTotal}`,
          '',
          'Items Ordered:',
          orderLines,
          '',
          'Delivery Address:',
          addressBlock,
          '',
          'Our team will contact you shortly with fulfilment updates.',
          '',
          'Regards,',
          'Novel Silks',
        ].join('\n'),
      });
      result.customerSent = true;
    } catch (error) {
      result.warnings.push(
        error.code === 'EAUTH' || String(error.response || '').includes('Application-specific password required')
          ? 'Customer confirmation email failed because Gmail login failed.'
          : `Customer confirmation email failed: ${error.message || 'Unknown mail error.'}`,
      );
    }
  } else {
    result.warnings.push('Customer confirmation email was skipped because the customer email address was missing.');
  }

  try {
    await transporter.sendMail({
      from: `"Novel Silks Orders" <${gmailUser}>`,
      to: gmailUser,
      replyTo: orderRecord.customer.email || gmailUser,
      subject: `New paid order received - ${orderRecord.orderReference}`,
      text: [
        'A new paid order has been placed on the website.',
        '',
        `Order ID: ${orderRecord.orderReference}`,
        `Payment ID: ${orderRecord.paymentId}`,
        `Razorpay Order ID: ${orderRecord.razorpayOrderId}`,
        `Amount Paid: ${orderRecord.orderTotal}`,
        '',
        'Customer Details:',
        `Name: ${orderRecord.customer.fullName || 'NA'}`,
        `Email: ${orderRecord.customer.email || 'NA'}`,
        `Phone: ${orderRecord.customer.phone || 'NA'}`,
        '',
        'Delivery Address:',
        addressBlock,
        '',
        'Items Ordered:',
        orderLines,
        '',
        `Preferred Payment Method: ${orderRecord.paymentMethod}`,
        `Order Note: ${orderRecord.customer.note || 'None'}`,
      ].join('\n'),
    });
    result.ownerSent = true;
  } catch (error) {
    result.warnings.push(
      error.code === 'EAUTH' || String(error.response || '').includes('Application-specific password required')
        ? 'Owner order email failed because Gmail login failed.'
        : `Owner order email failed: ${error.message || 'Unknown mail error.'}`,
    );
  }

  return result;
};

app.use(
  cors({
    origin(origin, callback) {
      callback(null, true);
    },
  }),
);
app.use(express.json({ limit: '75mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    razorpayConfigured: Boolean(razorpay),
    publicKeyId: keyId || null,
    emailConfigured: Boolean(gmailUser && gmailAppPassword),
  });
});

app.get('/api/products', async (_req, res) => {
  try {
    const products = await readProducts();
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Unable to load products.',
    });
  }
});

app.get('/api/admin/check', requireAdmin, (_req, res) => {
  res.json({
    ok: true,
  });
});

app.put('/api/admin/products', requireAdmin, async (req, res) => {
  try {
    if (!Array.isArray(req.body.products)) {
      return res.status(400).json({
        error: 'Products must be sent as an array.',
      });
    }

    const products = req.body.products;
    const normalizedProducts = products.map((product) => normalizeProduct(product));
    await writeProducts(normalizedProducts);

    return res.json({
      ok: true,
      products: normalizedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Unable to save products.',
    });
  }
});

app.post('/api/admin/products/:id', requireAdmin, async (req, res) => {
  try {
    const products = await readProducts();
    const productId = Number(req.params.id);
    const existingIndex = products.findIndex((product) => Number(product.id) === productId);
    const existingProduct = existingIndex >= 0 ? products[existingIndex] : null;
    const normalizedProduct = normalizeProduct(
      {
        ...req.body,
        id: existingProduct?.id || productId || Date.now(),
      },
      existingProduct,
    );

    if (existingIndex >= 0) {
      products[existingIndex] = normalizedProduct;
    } else {
      products.unshift(normalizedProduct);
    }

    await writeProducts(products);

    return res.json({
      ok: true,
      product: normalizedProduct,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Unable to save product.',
    });
  }
});

app.delete('/api/admin/products/:id', requireAdmin, async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const products = await readProducts();
    const nextProducts = products.filter((product) => Number(product.id) !== productId);
    await writeProducts(nextProducts);

    return res.json({
      ok: true,
      products: nextProducts,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Unable to delete product.',
    });
  }
});

app.post('/api/admin/upload-image', requireAdmin, async (req, res) => {
  try {
    const relativeImagePath = await saveUploadedImage(req.body);
    const requestBaseUrl = `${req.protocol}://${req.get('host')}`;
    const imagePath = `${publicApiBaseUrl || requestBaseUrl}${relativeImagePath}`;

    return res.json({
      ok: true,
      imagePath,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Unable to upload image.',
    });
  }
});

app.post('/api/create-order', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({
        error: 'Razorpay keys are not configured on the server.',
      });
    }

    const { amount, currency = 'INR', receipt, notes = {} } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        error: 'A valid amount is required to create an order.',
      });
    }

    const order = await razorpay.orders.create({
      amount: Number(amount),
      currency,
      receipt: receipt || `novel-${Date.now()}`,
      notes,
    });

    return res.json({
      ...order,
      keyId: keyId || null,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Unable to create Razorpay order.',
    });
  }
});

app.post('/api/verify-payment', async (req, res) => {
  try {
    if (!keySecret) {
      return res.status(500).json({
        error: 'Razorpay secret is not configured on the server.',
      });
    }

    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      customer = {},
      items = [],
      amount = 0,
      paymentMethod = 'upi',
    } = req.body;

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({
        verified: false,
        error: 'Payment verification data is incomplete.',
      });
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({
        verified: false,
        error: 'Payment signature verification failed.',
      });
    }

    const orderReference = `NS-${Date.now()}`;
    const orderRecord = {
      orderReference,
      razorpayOrderId: orderId,
      paymentId,
      signature,
      orderTotal: amount,
      paymentMethod,
      customer: {
        fullName: customer.fullName || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
        city: customer.city || '',
        state: customer.state || '',
        pincode: customer.pincode || '',
        note: customer.note || '',
      },
      items,
      createdAt: new Date().toISOString(),
    };

    await saveOrderRecord(orderRecord);

    let emailSent = false;
    let emailWarning = '';
    let sheetsSynced = false;
    let sheetsWarning = '';

    try {
      const sheetResult = await syncOrderToGoogleSheets(orderRecord);
      sheetsSynced = Boolean(sheetResult.synced);
      sheetsWarning = sheetResult.warning || '';
    } catch (sheetError) {
      sheetsWarning = sheetError.message || 'Google Sheets sync failed.';
    }

    if (gmailUser && gmailAppPassword) {
      try {
        const mailResult = await sendOrderEmails(orderRecord);
        emailSent = Boolean(mailResult.customerSent && mailResult.ownerSent);
        emailWarning = mailResult.warnings.join(' ');
      } catch (mailError) {
        emailWarning =
          mailError.code === 'EAUTH' || String(mailError.response || '').includes('Application-specific password required')
            ? 'Payment was successful, but the confirmation email could not be sent because Gmail login failed.'
            : 'Payment was successful, but the confirmation email could not be sent right now.';
      }
    } else {
      emailWarning = 'Payment was successful, but email is not configured on the server.';
    }

    return res.json({
      verified: true,
      message: 'Payment verified successfully.',
      orderReference,
      emailSent,
      emailWarning,
      sheetsSynced,
      sheetsWarning,
    });
  } catch (error) {
    return res.status(500).json({
      verified: false,
      error: error.message || 'Unable to verify payment.',
    });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    if (!gmailUser || !gmailAppPassword) {
      return res.status(500).json({
        error: 'Gmail sender credentials are not configured on the server.',
      });
    }

    const { name, email, phone, enquiryType, message } = req.body;

    if (!name || !email || !phone || !enquiryType || !message) {
      return res.status(400).json({
        error: 'Please fill in all enquiry fields before sending.',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Novel Silks Website" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `New website enquiry: ${enquiryType}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Enquiry Type: ${enquiryType}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    });

    return res.json({
      ok: true,
      message: 'Your enquiry has been sent successfully.',
    });
    } catch (error) {
      return res.status(500).json({
        error:
          error.code === 'EAUTH' || String(error.response || '').includes('Application-specific password required')
            ? 'Gmail login failed. Please update Render with a valid Google App Password for novelsilks@gmail.com.'
            : error.message || 'Unable to send enquiry email.',
      });
    }
  });

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  return res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Novel Silks server running on http://localhost:${port}`);
});
