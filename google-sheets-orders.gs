const SHEET_NAME = 'Orders';
const SHARED_SECRET = 'replace-with-your-optional-shared-secret';

function doPost(e) {
  try {
    const secret = e?.parameter?.secret || '';

    if (SHARED_SECRET && secret !== SHARED_SECRET) {
      return ContentService.createTextOutput('Unauthorized').setMimeType(ContentService.MimeType.TEXT);
    }

    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = getOrdersSheet_();

    const itemNames = (payload.items || [])
      .map((item) => `${item.name} x${item.quantity}`)
      .join(', ');

    sheet.appendRow([
      new Date(),
      payload.orderReference || '',
      payload.paymentId || '',
      payload.razorpayOrderId || '',
      payload.orderTotal || '',
      payload.paymentMethod || '',
      payload.customer?.fullName || '',
      payload.customer?.email || '',
      payload.customer?.phone || '',
      payload.customer?.address || '',
      payload.customer?.city || '',
      payload.customer?.state || '',
      payload.customer?.pincode || '',
      payload.customer?.note || '',
      itemNames,
      JSON.stringify(payload.items || []),
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, message: 'Order saved to Google Sheets.' }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.message || 'Unable to save order.' }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrdersSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Created At',
      'Order Reference',
      'Payment ID',
      'Razorpay Order ID',
      'Order Total',
      'Payment Method',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Address',
      'City',
      'State',
      'Pincode',
      'Customer Note',
      'Items Summary',
      'Items JSON',
    ]);
  }

  return sheet;
}
