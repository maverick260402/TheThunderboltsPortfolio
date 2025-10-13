// Vercel Serverless Function - Google Sheets Form Submission & Email Notification
// This function handles form submissions, appends data to Google Sheets, and sends email notifications

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const { Resend } = require('resend');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Parse request body
    const { projectScope, timeline, requirements } = req.body;

    // Validate required fields
    if (!projectScope || !timeline || !requirements) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Get environment variables for Google Sheets
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

    // Validate environment variables
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
      console.error('Missing environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact support.'
      });
    }

    // Initialize JWT auth
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    // Initialize the sheet
    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);

    // Load document properties and worksheets
    await doc.loadInfo();

    // Get the first sheet (or create one if it doesn't exist)
    let sheet = doc.sheetsByIndex[0];

    // If no sheet exists, create one
    if (!sheet) {
      sheet = await doc.addSheet({
        headerValues: ['Timestamp', 'Project Scope', 'Timeline', 'Requirements']
      });
    } else {
      // Load the sheet's header row
      await sheet.loadHeaderRow();

      // Check if headers exist, if not, set them
      const headers = sheet.headerValues;
      if (!headers || headers.length === 0) {
        await sheet.setHeaderRow(['Timestamp', 'Project Scope', 'Timeline', 'Requirements']);
      }
    }

    // Prepare the row data
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Add the row to the sheet
    await sheet.addRow({
      'Timestamp': timestamp,
      'Project Scope': projectScope,
      'Timeline': timeline,
      'Requirements': requirements
    });

    // Send email notification via Resend
    try {
      const RESEND_API_KEY = process.env.RESEND_API_KEY;
      const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

      if (RESEND_API_KEY && NOTIFICATION_EMAIL) {
        const resend = new Resend(RESEND_API_KEY);

        await resend.emails.send({
          from: 'Enterprise Inquiry <onboarding@resend.dev>',
          to: [NOTIFICATION_EMAIL],
          subject: `New Enterprise Inquiry - ${projectScope}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: 'Courier New', monospace; background-color: #0d1117; color: #c9d1d9; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background-color: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 30px; }
                .header { color: #00ff41; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #00ff41; padding-bottom: 10px; }
                .field { margin-bottom: 20px; }
                .label { color: #58a6ff; font-weight: bold; margin-bottom: 5px; }
                .value { background-color: #0d1117; padding: 10px; border-left: 3px solid #00ff41; margin-top: 5px; }
                .timestamp { color: #8b949e; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #30363d; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">⚡ New Enterprise Inquiry</div>

                <div class="field">
                  <div class="label">Project Scope:</div>
                  <div class="value">${projectScope}</div>
                </div>

                <div class="field">
                  <div class="label">Timeline:</div>
                  <div class="value">${timeline}</div>
                </div>

                <div class="field">
                  <div class="label">Requirements:</div>
                  <div class="value">${requirements.replace(/\n/g, '<br>')}</div>
                </div>

                <div class="timestamp">
                  Received: ${timestamp}
                </div>
              </div>
            </body>
            </html>
          `,
        });

        console.log('Email notification sent successfully');
      } else {
        console.warn('Email notification skipped: Missing RESEND_API_KEY or NOTIFICATION_EMAIL');
      }
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Failed to send email notification:', emailError);
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Error submitting form:', error);

    // Return error response with details for debugging
    return res.status(500).json({
      success: false,
      message: 'Failed to submit form. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
