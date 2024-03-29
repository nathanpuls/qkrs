function styleDollarSigns() {
  const elementsWithDollarSigns = document.querySelectorAll("*");

  elementsWithDollarSigns.forEach((element) => {
    const text = element.textContent || element.innerText;
    if (text.includes("$")) {
      const modifiedText = text.replace(
        /\$/g,
        '<span style="color: #fbcc5c;">$</span>'
      );
      element.innerHTML = modifiedText;
    }
  });
}

function redirectBasedOnSlug() {
  const urlParams = new URLSearchParams(window.location.search);
  let slug = urlParams.get("slug");

  slug = "magic"; // Test - comment out for live
  //document.title=slug;
  slug = slug.toLowerCase();
  var API_KEY = "AIzaSyDtBiP0s5TwGX9_G9iMHyke4b1k86JT8i4";
  var firstSpreadsheetId = "1AkOUgMYBIbg7ZhXciPIdz0mlDqc6lZzHb10oNp5rc8I";
  var firstRange = "Sheet1!A:B";
  var firstSheetLink = `https://sheets.googleapis.com/v4/spreadsheets/${firstSpreadsheetId}/values/${firstRange}?key=${API_KEY}`;

  fetch(firstSheetLink)
    .then((response) => response.json())
    .then((data) => {
      const redirectionRules = {};

      if (data.values && data.values.length > 0) {
        data.values.forEach((row) => {
          const key = row[0];
          const value = row[1];

          redirectionRules[key] = value;
        });
      }

      let redirectLink = redirectionRules[slug];

      if (redirectLink) {
        console.log("First Redirect Link: " + redirectLink);

        // Use redirectLink as the API key for the second spreadsheet
        var secondSpreadsheetId = redirectLink; // Assuming redirectLink contains the second spreadsheet ID
        var secondRange = "Sheet1!A1:C";

        var secondSheetLink = `https://sheets.googleapis.com/v4/spreadsheets/${secondSpreadsheetId}/values/${secondRange}?key=${API_KEY}`;

        fetch(secondSheetLink)
          .then((response) => response.json())
          .then((secondData) => {
            // Process data from the second spreadsheet
            console.log("Data from Second Spreadsheet:", secondData);

            // Organize data into key-value pairs
            const secondDataKeyValue = {};

            if (secondData.values && secondData.values.length > 0) {
              secondData.values.forEach((row) => {
                const key = row[0];
                const value = row[1];

                secondDataKeyValue[key] = value;
              });
            }

            var displayDiv = document.getElementById("displayDiv");

            var displayDiv = document.getElementById("displayDiv");

            if (displayDiv) {
              var table = document.createElement("table");
              table.className = "responsive-table";

              var tableBody = document.createElement("tbody");

              // Iterating through the fetched data and populating the table
              if (secondData.values && secondData.values.length > 0) {
                // Extract the header row and the data rows
                var headerRow = secondData.values[0];
                var dataRows = secondData.values.slice(1);

                // Sorting data rows based on values in column A (index 0)
                dataRows.sort((a, b) => a[0].localeCompare(b[0])); // Sort based on column A values

                // Create and append the header row at the top
                var headerRowElement = document.createElement("tr");

                // Reorder header cells from A C B
                [0, 2, 1].forEach((headerIndex) => {
                  var cell = document.createElement("td");
                  cell.textContent = headerRow[headerIndex];

                  cell.style.border = "1px solid #ddd"; // Border style for cells
                  cell.style.padding = "8px"; // Padding inside cells
                  cell.style.textAlign = "left"; // Center content horizontally
                  cell.style.fontWeight = "bold";

                  headerRowElement.appendChild(cell);
                });

                tableBody.appendChild(headerRowElement);

                // Append sorted data rows
                dataRows.forEach((rowData) => {
                  var row = document.createElement("tr");

                  // Reorder columns from A C B
                  [0, 2, 1].forEach((cellIndex) => {
                    var cell = document.createElement("td");
                    cell.textContent = rowData[cellIndex];

                    cell.style.border = "1px solid #ddd"; // Border style for cells
                    cell.style.padding = "8px"; // Padding inside cells
                    cell.style.textAlign = "left";

                    row.appendChild(cell);
                  });

                  tableBody.appendChild(row);
                });
              }

              table.appendChild(tableBody);
              displayDiv.appendChild(table);
            } else {
              console.log('The div with ID "displayDiv" was not found.');
            }
          })
          .catch((error) =>
            console.error("Error fetching data from second spreadsheet:", error)
          );
      } else {
        console.error(
          "Invalid or missing site parameter for the first spreadsheet"
        );
      }
    })
    .catch((error) =>
      console.error("Error fetching data from first spreadsheet:", error)
    );
}

window.onload = redirectBasedOnSlug;
