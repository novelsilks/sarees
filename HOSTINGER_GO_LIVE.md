# Noval Silks Go Live

## Architecture

- `Hostinger Premium`: frontend only
- `External Node API`: Razorpay + enquiry mail

This repo is now ready for that split.

## 1. Deploy the API first

You can deploy [server.js](/C:/Users/chida/OneDrive/Desktop/Novel%20Silks/server.js:1) to any Node host such as Render or Railway.

Required environment variables:

```env
VITE_RAZORPAY_KEY_ID=your_public_razorpay_key
RAZORPAY_KEY_ID=your_public_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
GMAIL_USER=novelsilks@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
API_ALLOWED_ORIGINS=https://novelsilks.com,https://www.novelsilks.com
PORT=3001
```

After deployment, note the API URL, for example:

```text
https://noval-silks-api.onrender.com
```

## 2. Build the frontend for Hostinger

Create a local `.env` with:

```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_RAZORPAY_KEY_ID=your_public_razorpay_key
```

Then build:

```bash
npm run build
```

Upload the contents of `dist/` into `public_html/` in Hostinger.

## 3. Point the domain

In Hostinger:

- connect `novelsilks.com` to the uploaded frontend
- if you use a custom backend subdomain like `api.novelsilks.com`, point that subdomain to your external API host

## 4. Gmail requirement

For the enquiry form to send mail directly to `novelsilks@gmail.com`, Gmail must have:

- 2-Step Verification enabled
- an App Password generated for the website backend

Use that app password as `GMAIL_APP_PASSWORD`.

## 5. Razorpay requirement

Use your live Razorpay keys only after testing with test keys first.
