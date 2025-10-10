// Vercel Serverless Function - Google Sheets Form Submission
// This function handles form submissions and appends data to Google Sheets

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

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
