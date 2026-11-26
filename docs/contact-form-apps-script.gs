// Zerix contact form -> Google Sheet + email.
// Paste into Extensions > Apps Script of the Google Sheet that should hold the enquiries.
const TO = 'info@zerixsecurities.com'; // where enquiry emails are sent

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return ContentService.createTextOutput('ok'); // spam trap filled -> ignore
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(['Received', 'Name', 'Email', 'Phone', 'Organisation', 'Interested in', 'Message']);
  sheet.appendRow([new Date(), p.name, p.email, p.phone, p.org, p.topic, p.message]);
  const body = 'Name: ' + p.name + '\nEmail: ' + p.email + '\nPhone: ' + (p.phone || '-') +
    '\nOrganisation: ' + (p.org || '-') + '\nInterested in: ' + p.topic + '\n\n' + p.message;
  MailApp.sendEmail({ to: TO, replyTo: p.email, subject: 'Website enquiry: ' + p.topic + ' (' + p.name + ')', body: body });
  return ContentService.createTextOutput('ok');
}
