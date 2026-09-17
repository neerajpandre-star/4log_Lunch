/**
 * ==========================================================================
 * 4LOG — JOIN THE CIRCLE BACKEND (Google Apps Script)
 * ==========================================================================
 * 
 * Instructions:
 * 1. Open your target Google Sheet (or create a new one).
 * 2. Rename or ensure the sheet tab is named: "4LOG Circle"
 * 3. In Google Sheets menu, click: Extensions → Apps Script
 * 4. Replace any default code in Code.gs with this entire script.
 * 5. Click "Deploy" (top-right) → "New deployment".
 * 6. Select type: "Web app".
 * 7. Set:
 *    - Description: 4LOG Circle API
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone
 * 8. Click "Deploy", authorize access, and copy the Web App URL.
 * 9. Paste the URL into your project's .env as:
 *    VITE_GOOGLE_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXXX/exec
 */

var SHEET_NAME = '4LOG Circle';
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var THROTTLE_SECONDS = 15; // Rate limit window per email to mitigate rapid automated spam

/**
 * Handles incoming POST requests from the 4LOG website.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  var lockAcquired = false;

  try {
    // 1. Acquire mutex lock (wait up to 10s) to guarantee atomic writes and avoid race conditions
    lockAcquired = lock.tryLock(10000);
    if (!lockAcquired) {
      return jsonResponse({
        success: false,
        message: 'Server is busy. Please try again in a moment.'
      });
    }

    // 2. Safely parse request data
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var rawEmail = data.email || '';
    if (typeof rawEmail !== 'string') {
      return jsonResponse({
        success: false,
        message: 'Invalid email'
      });
    }

    // 3. Trim whitespace and convert to lowercase
    var email = rawEmail.trim().toLowerCase();

    // 4. Reject empty or invalid emails
    if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
      return jsonResponse({
        success: false,
        message: 'Invalid email'
      });
    }

    // 5. Abuse / spam throttling via CacheService
    var cache = CacheService.getScriptCache();
    var cacheKey = 'throttle_' + Utilities.base64Encode(email).slice(0, 50);
    if (cache.get(cacheKey)) {
      return jsonResponse({
        success: false,
        message: 'Please wait a moment before submitting again.'
      });
    }

    // 6. Access the Google Spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // If the sheet tab does not exist yet, create it automatically
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Automatically create header row if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email']);
      var headerRange = sheet.getRange(1, 1, 1, 2);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#111111');
      headerRange.setFontColor('#ffffff');
    }

    // 7. Check for duplicate email (Column B)
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var emailColumnValues = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var i = 0; i < emailColumnValues.length; i++) {
        var existingEmail = String(emailColumnValues[i][0]).trim().toLowerCase();
        if (existingEmail === email) {
          return jsonResponse({
            success: false,
            duplicate: true,
            message: 'Email already joined'
          });
        }
      }
    }

    // 8. Generate server-side timestamp and record the new entry
    var timeZone = ss.getSpreadsheetTimeZone() || Session.getScriptTimeZone() || 'UTC';
    var timestamp = Utilities.formatDate(new Date(), timeZone, 'yyyy-MM-dd HH:mm:ss');
    sheet.appendRow([timestamp, email]);

    // 9. Cache key to throttle repeated spam
    cache.put(cacheKey, '1', THROTTLE_SECONDS);

    // 10. Return success response
    return jsonResponse({
      success: true,
      message: 'Joined successfully'
    });

  } catch (err) {
    return jsonResponse({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  } finally {
    if (lockAcquired) {
      lock.releaseLock();
    }
  }
}

/**
 * Handles GET requests (for quick browser verification and health checks).
 */
function doGet(e) {
  return jsonResponse({
    success: true,
    message: '4LOG Circle Web App API is active.'
  });
}

/**
 * Standardized JSON response helper.
 */
function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
