// Zerix contact form -> Google Sheet + email.
// 1) Set SHEET_ID (the long id in the sheet's URL: docs.google.com/spreadsheets/d/<SHEET_ID>/edit)
// 2) Run setupTest once from the editor and approve the permissions
// 3) Deploy > Manage deployments > edit > New version > Deploy
const SHEET_ID = 'PASTE_SHEET_ID_HERE';
const TO = 'info@zerixsecurities.com';

function doGet() { return ContentService.createTextOutput('Zerix form endpoint is live'); }

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    if (p.website) return ContentService.createTextOutput('ok');
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(['Received', 'Name', 'Email', 'Phone', 'Organisation', 'Interested in', 'Message']);
    sheet.appendRow([new Date(), p.name, p.email, p.phone, p.org, p.topic, p.message]);
    const body = 'Name: ' + p.name + '\nEmail: ' + p.email + '\nPhone: ' + (p.phone || '-') +
      '\nOrganisation: ' + (p.org || '-') + '\nInterested in: ' + p.topic + '\n\n' + p.message;
    MailApp.sendEmail({ to: TO, replyTo: p.email, subject: 'Website enquiry: ' + p.topic + ' (' + p.name + ')', body: body });
    return ContentService.createTextOutput('ok');
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput('error: ' + err);
  }
}

// Run this once from the editor: it asks for permissions and sends a test row + email.
function setupTest() {
  doPost({ parameter: { name: 'Test', email: TO, phone: '', org: 'Zerix', topic: 'Test', message: 'Setup test' } });
}
