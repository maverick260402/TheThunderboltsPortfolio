# 🖥️ Local Development Guide

## Quick Start - Run Locally in 3 Steps

### ✅ Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install:
- `google-spreadsheet` - Google Sheets API client
- `google-auth-library` - Authentication library

### ✅ Step 2: Set Up Environment Variables

You already have your `.env` file configured with:
- ✅ `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- ✅ `GOOGLE_PRIVATE_KEY`
- ✅ `GOOGLE_SHEET_ID`

**Important**: Make sure your Google Sheet is shared with your service account email:
- Open your Google Sheet: https://docs.google.com/spreadsheets/d/1yY0CVYZhxq7JHtzHQCkTq0DWsqfyJp8GpIY93w8kp1c/edit
- Click **"Share"** button
- Add: `portfolio-form-handler@thunderbolts-digital-hub.iam.gserviceaccount.com`
- Give **"Editor"** access
- Click **"Send"**

### ✅ Step 3: Start Development Server

Run the Vercel development server:

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Start development server
vercel dev
```

**First time running?** Vercel will ask you:
1. "Set up and develop?" → Press **Enter** (Yes)
2. "Which scope?" → Select your account
3. "Link to existing project?" → Press **n** (No)
4. "Project name?" → Press **Enter** (use default)
5. "Directory location?" → Press **Enter** (use `.`)
6. "Override settings?" → Press **n** (No)

The server will start at: **http://localhost:3000**

---

## 🧪 Testing Your Form Locally

1. Open your browser to: **http://localhost:3000**
2. Scroll to the **"Enterprise Inquiry"** form
3. Fill in the form:
   - **Project Scope**: Select any option
   - **Timeline**: e.g., "3-6 months"
   - **Requirements**: e.g., "Need an AI chatbot for customer support"
4. Click **"Send Inquiry"**
5. You should see a green success message
6. Check your Google Sheet - a new row should appear!

---

## 📁 Project Structure

```
TheThunderboltsPortfolio/
├── api/
│   └── submit-form.js          # Serverless function (runs at /api/submit-form)
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js           # Form handling code
├── index.html                   # Your portfolio page
├── .env                         # Environment variables (NOT committed to git)
├── package.json                 # Dependencies
└── vercel.json                  # Vercel configuration
```

---

## 🔍 How It Works Locally

1. **Vercel Dev** simulates the Vercel serverless environment on your machine
2. **Static files** (HTML, CSS, JS) are served from the project root
3. **API functions** in the `/api` folder become available at `/api/[function-name]`
4. **Environment variables** from `.env` are loaded automatically
5. **Form submission** hits `http://localhost:3000/api/submit-form`

---

## 🛠️ Development Workflow

### Start Development Server
```bash
vercel dev
```

### Stop Server
Press `Ctrl + C` in the terminal

### View Function Logs
The terminal will show logs from your serverless function, including:
- Form submissions
- Google Sheets API calls
- Any errors

Example log output:
```
[GET] /
[POST] /api/submit-form
✓ Form submitted successfully
```

### Test Different Scenarios

**Test 1: Valid submission**
- Fill all fields → Should succeed

**Test 2: Missing fields**
- Leave fields empty → Should show validation error

**Test 3: Check Google Sheets**
- After submission → Verify data appears in sheet

---

## 🐛 Troubleshooting

### "Module not found: google-spreadsheet"
**Solution**: Run `npm install`

### "GOOGLE_SHEET_ID is not defined"
**Solution**: Check your `.env` file exists and has all 3 variables

### "The caller does not have permission"
**Solution**: Share your Google Sheet with the service account email

### "Failed to submit form"
**Check**:
1. Is `vercel dev` running?
2. Open browser DevTools (F12) → Console tab
3. Look for network errors
4. Check terminal for function logs

### Port 3000 already in use
**Solution**:
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
vercel dev --listen 3001
```

---

## 🔥 Hot Reload

Vercel Dev includes hot reload:
- **HTML/CSS/JS changes** → Refresh browser
- **API function changes** → Auto-reloaded
- **`.env` changes** → Restart `vercel dev`

---

## 📊 View Your Google Sheet

Your submissions are saved here:
https://docs.google.com/spreadsheets/d/1yY0CVYZhxq7JHtzHQCkTq0DWsqfyJp8GpIY93w8kp1c/edit

Expected columns:
```
| Timestamp | Project Scope | Timeline | Requirements |
```

---

## 🚀 Ready to Deploy?

Once everything works locally:

```bash
# Deploy to production
vercel --prod
```

**Important**: Environment variables from `.env` are NOT deployed automatically.
You must add them in Vercel Dashboard:
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add all 3 variables
5. Redeploy

---

## 💡 Tips

1. **Keep `vercel dev` running** while developing
2. **Check terminal logs** for API errors
3. **Use browser DevTools** for frontend debugging
4. **Test form validation** before deploying
5. **Verify Google Sheet permissions** if submissions fail

---

## 🎯 Commands Cheat Sheet

```bash
# Install dependencies
npm install

# Install Vercel CLI globally
npm install -g vercel

# Start development server
vercel dev

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# Pull environment variables from Vercel
vercel env pull
```

---

## ✅ Current Status

Based on your `.env` file:
- ✅ Service account email: `portfolio-form-handler@thunderbolts-digital-hub.iam.gserviceaccount.com`
- ✅ Private key: Configured
- ✅ Sheet ID: `1yY0CVYZhxq7JHtzHQCkTq0DWsqfyJp8GpIY93w8kp1c`

**Next step**:
1. Run `npm install`
2. Run `vercel dev`
3. Test the form at `http://localhost:3000`

You're all set! 🎉
