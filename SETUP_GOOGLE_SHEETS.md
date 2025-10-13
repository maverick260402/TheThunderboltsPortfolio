# Google Sheets Form Integration Setup Guide

This guide will help you set up Google Sheets integration for your portfolio contact form on Vercel's free tier.

## 📋 Overview

When users submit the enterprise inquiry form, the data will be automatically saved to a Google Sheet with the following columns:
- **Timestamp** - Date and time of submission
- **Project Scope** - Selected project type
- **Timeline** - Estimated timeline
- **Requirements** - Detailed requirements

---

## 🔧 Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Create Project"** or select an existing project
3. Name your project (e.g., "Portfolio Form Handler")
4. Click **"Create"**

---

## 🔑 Step 2: Enable Google Sheets API

1. In your Google Cloud project, go to **"APIs & Services" > "Library"**
2. Search for **"Google Sheets API"**
3. Click on it and press **"Enable"**

---

## 👤 Step 3: Create a Service Account

1. Go to **"APIs & Services" > "Credentials"**
2. Click **"Create Credentials" > "Service Account"**
3. Fill in the details:
   - **Service account name**: `portfolio-form-handler`
   - **Service account ID**: Will auto-populate
   - **Description**: "Handles form submissions to Google Sheets"
4. Click **"Create and Continue"**
5. Skip the optional steps and click **"Done"**

---

## 🔐 Step 4: Create Service Account Key

1. In the **"Credentials"** page, find your service account
2. Click on the service account email
3. Go to the **"Keys"** tab
4. Click **"Add Key" > "Create new key"**
5. Select **"JSON"** format
6. Click **"Create"**
7. A JSON file will be downloaded - **KEEP THIS SAFE!**

The JSON file will look like this:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "portfolio-form-handler@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

---

## 📊 Step 5: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it (e.g., "Portfolio Form Submissions")
4. **Important**: Share the sheet with your service account:
   - Click the **"Share"** button
   - Paste the **client_email** from your JSON file (e.g., `portfolio-form-handler@your-project.iam.gserviceaccount.com`)
   - Give it **"Editor"** access
   - Click **"Send"** (uncheck "Notify people" if prompted)
5. Copy the **Sheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1AbC123XyZ-456/edit`
   - Sheet ID is: `1AbC123XyZ-456`

---

## 🚀 Step 6: Configure Vercel Environment Variables

### Option A: Using Vercel Dashboard (Recommended)

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings > Environment Variables**
4. Add the following three environment variables:

| Name | Value | Notes |
|------|-------|-------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Copy from JSON: `client_email` | e.g., `portfolio-form-handler@...` |
| `GOOGLE_PRIVATE_KEY` | Copy from JSON: `private_key` | Include the full key with `-----BEGIN PRIVATE KEY-----` |
| `GOOGLE_SHEET_ID` | Your Google Sheet ID | From Step 5 |

**Important Notes:**
- For `GOOGLE_PRIVATE_KEY`: Copy the entire value including newlines. Vercel will handle it correctly.
- Make sure there are no extra quotes or spaces
- Apply to: **Production**, **Preview**, and **Development**

### Option B: Using Vercel CLI

If you prefer using the command line:

```bash
# Install Vercel CLI if you haven't
portfolio-form-handler@thunderbolts-digital-hub.iam.gserviceaccount.com

# Login to Vercel
vercel login

# Add environment variables
vercel env add GOOGLE_SERVICE_ACCOUNT_EMAIL
# Paste the client_email value and press Enter

vercel env add GOOGLE_PRIVATE_KEY
# Paste the entire private_key value (with newlines) and press Enter

vercel env add GOOGLE_SHEET_ID
# Paste your sheet ID and press Enter
```

---

## 📦 Step 7: Deploy to Vercel

### First Time Deployment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Deploy to Vercel:
   ```bash
   # If you haven't installed Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy (follow the prompts)
   vercel --prod
   ```

### Subsequent Deployments

Simply push to your Git repository (GitHub, GitLab, or Bitbucket) and Vercel will auto-deploy, or run:

```bash
vercel --prod
```

---

## ✅ Step 8: Test Your Form

1. Visit your deployed site
2. Scroll to the **"Enterprise Inquiry"** form
3. Fill in all fields:
   - Select a **Project Scope**
   - Enter a **Timeline**
   - Enter **Requirements**
4. Click **"Send Inquiry"**
5. You should see a success message
6. Check your Google Sheet - a new row should appear with the submission data!

---

## 🔍 Troubleshooting

### Error: "Server configuration error"
- **Cause**: Missing or incorrect environment variables
- **Solution**: Double-check that all 3 environment variables are set correctly in Vercel

### Error: "Failed to submit form"
- **Cause**: Google Sheet not shared with service account
- **Solution**: Make sure you shared your Google Sheet with the `client_email` from your service account

### Error: "The caller does not have permission"
- **Cause**: Service account doesn't have editor access
- **Solution**: Share the sheet with your service account email and give it "Editor" permissions

### Form submits but no data in sheet
- **Cause**: Wrong Sheet ID or sheet not accessible
- **Solution**:
  1. Verify the Sheet ID in environment variables
  2. Ensure the sheet is shared with the service account
  3. Check Vercel function logs: Go to Vercel Dashboard > Your Project > Functions tab

### Private key format error
- **Cause**: Incorrect private key formatting
- **Solution**: Copy the entire `private_key` value from JSON, including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

---

## 📝 Notes

- **Free Tier Compatible**: This solution works perfectly on Vercel's free (Hobby) tier
- **No OAuth Required**: Service accounts don't need user authentication
- **Automatic Headers**: The serverless function automatically creates headers if they don't exist
- **Timestamp**: All submissions include UTC timestamp
- **Rate Limits**: Vercel free tier allows 100GB bandwidth and 100 function invocations per day (more than enough for a portfolio)

---

## 🛡️ Security Best Practices

1. **Never commit** your service account JSON file to Git
2. **Never expose** your private key in client-side code
3. **Use environment variables** for all sensitive data
4. **Regularly review** your Google Sheet access permissions
5. **Consider adding** email notifications when new submissions arrive (can be done with Google Sheets built-in features)

---

## 📧 Optional: Email Notifications

To get email notifications when someone submits the form:

1. Open your Google Sheet
2. Go to **Tools > Notification rules**
3. Select **"Any changes are made"**
4. Choose **"Email - right away"**
5. Click **"Save"**

Now you'll get an email every time someone submits the form!

---

## 🎉 You're All Set!

Your portfolio form is now connected to Google Sheets and ready to collect submissions on Vercel's free tier. All form data will be automatically saved with timestamps for easy tracking and follow-up.

### Quick Checklist:
- ✅ Google Cloud Project created
- ✅ Google Sheets API enabled
- ✅ Service account created with JSON key
- ✅ Google Sheet created and shared with service account
- ✅ Environment variables added to Vercel
- ✅ Code deployed to Vercel
- ✅ Form tested successfully

Happy coding! ⚡
