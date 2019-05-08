import config from "../config";

/**
 * Load the data from the spreadsheet
 * Get the right values from it and assign.
 */
export function load() {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A1:A30"
      })
      .then(res => console.log(res));
  });
}
