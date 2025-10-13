# Email Notification Setup Guide

This guide explains how to set up email notifications for the Enterprise Inquiry Form using Resend (free tier).

## Overview

When someone submits the Enterprise Inquiry Form:
1. ✅ Data is saved to Google Sheets
2. ✅ An email notification is sent to your Gmail account with all inquiry details

## Prerequisites

- Resend API Key (free tier)
- Your Gmail address where you want to receive notifications

## Setup Instructions

### Step 1: Get Your Resend API Key

1. Go to [Resend](https://resend.com) and sign up for a free account
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Copy the API key (starts with `re_`)

**Note**: Resend's free tier allows:
- 100 emails per day
- 3,000 emails per month
- Perfect for portfolio inquiry notifications!

### Step 2: Configure Environment Variables

#### For Local Development (Testing)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   # Resend Configuration
   RESEND_API_KEY=re_your_actual_api_key_here
   NOTIFICATION_EMAIL=your-email@gmail.com

   # (Keep your existing Google Sheets credentials)
   ```

3. Make sure `.env` is in `.gitignore` (already configured)

#### For Production (Vercel)

1. Go to your Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `NOTIFICATION_EMAIL`: Your Gmail address

### Step 3: Understanding the Email Sender

**Important**: With Resend's free tier, you'll use their test email address:
```
from: 'Enterprise Inquiry <onboarding@resend.dev>'
```

This is a **verified sender** provided by Resend for testing. Your notification emails will come from this address.

**To use your own domain** (requires paid plan):
1. Verify your domain in Resend Dashboard
2. Update the `from` field in [api/submit-form.js](api/submit-form.js:117)

### Step 4: Test Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser

4. Fill out the Enterprise Inquiry Form and submit

5. Check your terminal for logs:
   - ✅ "Email notification sent successfully" = Working!
   - ⚠️ "Email notification skipped: Missing..." = Check environment variables
   - ❌ Error message = Check API key validity

6. Check your Gmail inbox for the notification email

### Step 5: Deploy to Vercel

1. Make sure environment variables are set in Vercel Dashboard

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Test the form on your live site

## Email Template

The notification email includes:
- ⚡ **Subject**: "New Enterprise Inquiry - [Project Scope]"
- 📋 **Project Scope**: Selected option
- ⏰ **Timeline**: Client's timeline
- 📝 **Requirements**: Full description
- 🕐 **Timestamp**: When the inquiry was received

The email is styled with your portfolio's matrix/terminal theme!

## Troubleshooting

### Email not received

1. **Check spam folder** - First time emails might be filtered
2. **Verify API key** - Make sure it's correct and active
3. **Check Vercel logs** - Look for email-related errors
4. **Verify environment variables** - Both `RESEND_API_KEY` and `NOTIFICATION_EMAIL` must be set

### "Missing RESEND_API_KEY or NOTIFICATION_EMAIL" warning

- The form will still work (Google Sheets saves the data)
- Email notification is skipped
- Add the missing environment variables

### Error sending email

Check Resend Dashboard:
- Are you within free tier limits? (100/day, 3000/month)
- Is your API key still valid?
- Check Resend logs for delivery issues

### Local testing not working

1. Make sure `.env` file exists in project root
2. Run `vercel dev` (not just a static server)
3. Check that `.env` has no syntax errors

## Code Structure

- **[api/submit-form.js](api/submit-form.js)**: Handles form submission, Google Sheets, and Resend email
- **[assets/js/script.js](assets/js/script.js)**: Frontend form handling
- **[index.html](index.html)**: Enterprise Inquiry Form UI

## Free Tier Limits

**Resend Free Tier:**
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ No credit card required
- ✅ All API features included

**Vercel Free Tier:**
- ✅ 100 GB bandwidth/month
- ✅ Unlimited serverless function invocations
- ✅ No credit card required

Both services are perfect for your portfolio!

## Next Steps

### Optional Enhancements

1. **Custom Email Template**: Edit the HTML in [api/submit-form.js](api/submit-form.js:120-159)
2. **Multiple Recipients**: Add more emails to the `to` array
3. **Auto-Reply**: Send a confirmation email to the client
4. **Domain Verification**: Use your own domain (Resend paid plan)

## Support

If you encounter issues:
1. Check Vercel function logs
2. Review Resend dashboard for email delivery logs
3. Ensure all environment variables are correctly set

---

**Done!** Your Enterprise Inquiry Form now sends email notifications. 🎉
