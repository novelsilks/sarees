import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import Razorpay from 'razorpay';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = Number(process.env.PORT || 3001);
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;
const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
const allowedOrigins = (process.env.API_ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const razorpay =
  keyId && keySecret
    ? new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      })
    : null;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    razorpayConfigured: Boolean(razorpay),
  });
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
      receipt: receipt || `noval-${Date.now()}`,
      notes,
    });

    return res.json(order);
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Unable to create Razorpay order.',
    });
  }
});

app.post('/api/verify-payment', (req, res) => {
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

    return res.json({
      verified: true,
      message: 'Payment verified successfully.',
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

    await transporter.sendMail({
      from: `"Noval Silks Website" <${gmailUser}>`,
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
      error: error.message || 'Unable to send enquiry email.',
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
  console.log(`Noval Silks server running on http://localhost:${port}`);
});
