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
    const { name, phone, email, projectScope, timeline, requirements } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !projectScope) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Phone, Email, Project Scope)'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
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
        headerValues: ['Timestamp', 'Name', 'Phone', 'Email', 'Project Scope', 'Timeline', 'Project Details']
      });
    } else {
      // Load the sheet's header row
      await sheet.loadHeaderRow();

      // Check if headers exist, if not, set them
      const headers = sheet.headerValues;
      if (!headers || headers.length === 0) {
        await sheet.setHeaderRow(['Timestamp', 'Name', 'Phone', 'Email', 'Project Scope', 'Timeline', 'Project Details']);
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
      'Name': name,
      'Phone': phone,
      'Email': email,
      'Project Scope': projectScope,
      'Timeline': timeline || 'Not specified',
      'Project Details': requirements || 'Not provided'
    });

    // Send email notification via Resend
    try {
      const RESEND_API_KEY = process.env.RESEND_API_KEY;
      const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

      if (RESEND_API_KEY && NOTIFICATION_EMAIL) {
        const resend = new Resend(RESEND_API_KEY);

        await resend.emails.send({
          from: 'The Thunderbolts Portfolio <onboarding@resend.dev>',
          to: [NOTIFICATION_EMAIL],
          subject: `⚡ New Lead: ${name} - ${projectScope}`,
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  padding: 40px 20px;
                  line-height: 1.6;
                }
                .email-wrapper {
                  max-width: 600px;
                  margin: 0 auto;
                  background: #ffffff;
                  border-radius: 16px;
                  overflow: hidden;
                  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }
                .header {
                  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                  padding: 40px 30px;
                  text-align: center;
                  position: relative;
                  overflow: hidden;
                }
                .header::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  height: 4px;
                  background: linear-gradient(90deg, #00ff41, #64ffda, #00ff41);
                }
                .header-icon {
                  font-size: 48px;
                  margin-bottom: 10px;
                }
                .header-title {
                  color: #00ff41;
                  font-size: 28px;
                  font-weight: 700;
                  margin-bottom: 8px;
                  letter-spacing: -0.5px;
                }
                .header-subtitle {
                  color: #94a3b8;
                  font-size: 14px;
                  font-weight: 500;
                  text-transform: uppercase;
                  letter-spacing: 2px;
                }
                .content {
                  padding: 40px 30px;
                }
                .alert-box {
                  background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
                  border-left: 4px solid #0ea5e9;
                  padding: 20px;
                  border-radius: 8px;
                  margin-bottom: 30px;
                }
                .alert-title {
                  color: #0369a1;
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 8px;
                }
                .alert-text {
                  color: #0c4a6e;
                  font-size: 14px;
                  line-height: 1.5;
                }
                .section {
                  margin-bottom: 30px;
                }
                .section-title {
                  color: #1e293b;
                  font-size: 12px;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  margin-bottom: 12px;
                  padding-bottom: 8px;
                  border-bottom: 2px solid #e2e8f0;
                }
                .info-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
                  margin-bottom: 20px;
                }
                .info-card {
                  background: #f8fafc;
                  padding: 20px;
                  border-radius: 12px;
                  border: 1px solid #e2e8f0;
                  transition: all 0.3s ease;
                }
                .info-card:hover {
                  border-color: #00ff41;
                  box-shadow: 0 4px 12px rgba(0, 255, 65, 0.1);
                }
                .info-label {
                  color: #64748b;
                  font-size: 11px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  margin-bottom: 8px;
                }
                .info-value {
                  color: #1e293b;
                  font-size: 16px;
                  font-weight: 600;
                  word-break: break-word;
                }
                .info-value a {
                  color: #0ea5e9;
                  text-decoration: none;
                }
                .info-value a:hover {
                  text-decoration: underline;
                }
                .detail-box {
                  background: #f1f5f9;
                  padding: 24px;
                  border-radius: 12px;
                  border: 1px solid #cbd5e1;
                  margin-top: 12px;
                }
                .detail-content {
                  color: #334155;
                  font-size: 14px;
                  line-height: 1.8;
                  white-space: pre-wrap;
                  word-wrap: break-word;
                }
                .badge {
                  display: inline-block;
                  background: linear-gradient(135deg, #00ff41 0%, #64ffda 100%);
                  color: #0f172a;
                  padding: 8px 16px;
                  border-radius: 20px;
                  font-size: 13px;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  margin-bottom: 16px;
                }
                .footer {
                  background: #f8fafc;
                  padding: 30px;
                  text-align: center;
                  border-top: 1px solid #e2e8f0;
                }
                .timestamp {
                  color: #64748b;
                  font-size: 12px;
                  margin-bottom: 12px;
                }
                .footer-text {
                  color: #94a3b8;
                  font-size: 11px;
                  line-height: 1.6;
                }
                .cta-button {
                  display: inline-block;
                  background: linear-gradient(135deg, #00ff41 0%, #64ffda 100%);
                  color: #0f172a;
                  padding: 14px 32px;
                  border-radius: 8px;
                  text-decoration: none;
                  font-weight: 700;
                  font-size: 14px;
                  margin-top: 20px;
                  transition: all 0.3s ease;
                }
                @media only screen and (max-width: 600px) {
                  .email-wrapper { border-radius: 0; }
                  .header, .content, .footer { padding: 24px 20px; }
                  .info-grid { grid-template-columns: 1fr; gap: 12px; }
                  .header-title { font-size: 22px; }
                }
              </style>
            </head>
            <body>
              <div class="email-wrapper">
                <!-- Header -->
                <div class="header">
                  <div class="header-icon">⚡</div>
                  <div class="header-title">New Client Inquiry</div>
                  <div class="header-subtitle">The Thunderbolts Portfolio</div>
                </div>

                <!-- Content -->
                <div class="content">
                  <!-- Alert Box -->
                  <div class="alert-box">
                    <div class="alert-title">🎯 Action Required</div>
                    <div class="alert-text">
                      A potential client has submitted an inquiry. Review the details below and respond within 24 hours for best conversion rates.
                    </div>
                  </div>

                  <!-- Project Type Badge -->
                  <div class="badge">${projectScope}</div>

                  <!-- Contact Information -->
                  <div class="section">
                    <div class="section-title">👤 Contact Information</div>
                    <div class="info-grid">
                      <div class="info-card">
                        <div class="info-label">Full Name</div>
                        <div class="info-value">${name}</div>
                      </div>
                      <div class="info-card">
                        <div class="info-label">Phone Number</div>
                        <div class="info-value"><a href="tel:${phone}">${phone}</a></div>
                      </div>
                    </div>
                    <div class="info-card">
                      <div class="info-label">Email Address</div>
                      <div class="info-value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                  </div>

                  <!-- Project Details -->
                  <div class="section">
                    <div class="section-title">📋 Project Details</div>
                    <div class="info-grid">
                      <div class="info-card">
                        <div class="info-label">Project Scope</div>
                        <div class="info-value">${projectScope}</div>
                      </div>
                      <div class="info-card">
                        <div class="info-label">Timeline</div>
                        <div class="info-value">${timeline || 'Not specified'}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Additional Details -->
                  ${requirements ? `
                  <div class="section">
                    <div class="section-title">💬 Additional Information</div>
                    <div class="detail-box">
                      <div class="detail-content">${requirements.replace(/\n/g, '<br>')}</div>
                    </div>
                  </div>
                  ` : ''}
                </div>

                <!-- Footer -->
                <div class="footer">
                  <div class="timestamp">📅 Received: ${timestamp} UTC</div>
                  <div class="footer-text">
                    This inquiry was submitted through The Thunderbolts portfolio website.<br>
                    Respond promptly to maintain high conversion rates.
                  </div>
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
