import config from "../config";

/**
 * Load the data from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A1:A30"
      })
      .then(
        res => {
          const data = JSON.parse(res.body).values;
          const dates = data.map(datesArrays => datesArrays[0]);
          callback({
            dates
          });
        },
        res => {
          callback(false, res.result.error);
        }
      );
  });
}
