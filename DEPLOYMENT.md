# Quick Deployment Guide

## 🚀 Deploy to Vercel in 5 Minutes

### Prerequisites
- A [Vercel account](https://vercel.com/signup) (free tier works perfectly)
- A [Google account](https://accounts.google.com) for Google Sheets

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Set Up Google Sheets

Follow the detailed guide in [SETUP_GOOGLE_SHEETS.md](./SETUP_GOOGLE_SHEETS.md) to:
1. Create a Google Cloud service account
2. Create a Google Sheet for form submissions
3. Get your credentials

You'll need these three values:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SHEET_ID`

---

## Step 3: Deploy to Vercel

### Option A: Deploy with Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

During deployment, you'll be prompted to set up your project. Follow the prompts.

### Option B: Deploy with Git

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Click **"Import Project"**
4. Select your repository
5. Click **"Deploy"**

---

## Step 4: Add Environment Variables

In your Vercel Dashboard:

1. Go to **Settings > Environment Variables**
2. Add these three variables:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
3. Apply to: **Production, Preview, Development**
4. Click **"Save"**

**Important**: After adding environment variables, redeploy your project:
```bash
vercel --prod
```

---

## Step 5: Test Your Form

1. Visit your deployed site (e.g., `your-project.vercel.app`)
2. Scroll to the contact form
3. Fill out and submit the form
4. Check your Google Sheet - the data should appear!

---

## 🔄 Future Deployments

### Automatic Deployments (Git)
If you connected via Git, every push to your main branch will automatically deploy to Vercel.

### Manual Deployments (CLI)
```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

---

## 📁 Project Structure

```
TheThunderboltsPortfolio/
├── api/
│   └── submit-form.js          # Vercel serverless function
├── assets/
│   ├── css/
│   │   └── styles.css          # All styles
│   └── js/
│       └── script.js           # All JavaScript + form handling
├── index.html                   # Main page
├── package.json                 # Dependencies
├── vercel.json                  # Vercel configuration
├── .gitignore                   # Git ignore rules
├── SETUP_GOOGLE_SHEETS.md      # Detailed setup guide
└── DEPLOYMENT.md               # This file
```

---

## 🛠️ Local Development

To test the serverless function locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Run development server
vercel dev
```

This will start a local server at `http://localhost:3000` with the serverless function running.

**Note**: You'll still need to set up environment variables for local testing. Create a `.env` file:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id
```

---

## ❓ Need Help?

- **Setup Issues**: See [SETUP_GOOGLE_SHEETS.md](./SETUP_GOOGLE_SHEETS.md) for troubleshooting
- **Vercel Issues**: Check [Vercel Documentation](https://vercel.com/docs)
- **Form Not Working**: Check the browser console and Vercel function logs

---

## 🎉 Success!

Your portfolio is now live with a fully functional form that saves to Google Sheets - all on Vercel's free tier!

**Free Tier Limits:**
- ✅ 100GB bandwidth/month
- ✅ 100 function invocations/day (per function)
- ✅ Unlimited static requests
- ✅ Automatic HTTPS
- ✅ Global CDN

More than enough for a portfolio site! 🚀
