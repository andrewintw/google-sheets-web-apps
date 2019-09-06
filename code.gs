/* sheet URL: https://docs.google.com/spreadsheets/d/Zoetf9JsjwzsNqdO1ILoveUwaFrDbfctAFFzyHmyuuNg/edit */

/* It's pretty stupid, but apparently saving and republishing your google script web app is not good enough.
 * You need to save a new version and publish the new version to make sure your app gets updated properly.
 */

worksheet_id="Zoetf9JsjwzsNqdO1ILoveUwaFrDbfctAFFzyHmyuuNg";

function appendLines(worksheet, csvData) {
  var ss = SpreadsheetApp.openById(worksheet_id);
  var sheet = ss.getSheetByName(worksheet);

  var rows = Utilities.parseCsv(csvData);

  for ( var i = 0; i < rows.length; i++ ) {
    sheet.appendRow(rows[i]);
  }
}

function test() {
  Logger.log("Appending fake data");
  appendLines("PIRsheet", "1567761657, 0, 1\n1567761658, 1, 1");
}

/* WebApp URL: https://script.google.com/macros/s/AlicebxQSxOOfBeZLUqUn4MyxG2jJeCLgirLAW7TFrIeNdj2ltHP4f8/exec 
 *
 * curl test:
 * $ curl -L --data "hello, world" "https://script.google.com/macros/s/AlicebxQSxOOfBeZLUqUn4MyxG2jJeCLgirLAW7TFrIeNdj2ltHP4f8/exec?sheet=PIRsheet"
 * {"parameter":{"sheet":"PIRsheet","hello, world":""},"contextPath":"","contentLength":12,"queryString":"sheet=PIRsheet","parameters":{"sheet":["PIRsheet"],"hello, world":[""]},"postData":{"type":"application/x-www-form-urlencoded","length":12,"contents":"hello, world","name":"postData"}}
 */

function doPost(e) {
  var contents = e.postData.contents;
  var sheetName = e.parameter['sheet'];

  // Append to spreadsheet
  appendLines(sheetName, contents);

  var params = JSON.stringify(e);
  return ContentService.createTextOutput(params);
}
