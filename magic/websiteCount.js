document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = 'AIzaSyDtBiP0s5TwGX9_G9iMHyke4b1k86JT8i4';
    const spreadsheetId = '1A5oU3WMTWRg8tS2VtJeSmTr7E0tmhfRgUszl9HudCs0';
    const range = 'Sheet1!A:N'; // Include columns A to N in the range

    const sheetLink = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;

    fetch(sheetLink)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            const redirectionRules = {};

            if (data.values && data.values.length > 1) {
                // Assuming data.values[1] corresponds to the second row (N2)
                const websiteCountN2 = data.values[1][13] || 'over 100'; // column N - website count

                // Update the span with id "websiteCount" with the value from N2
                const websiteCountSpan = document.getElementById('websiteCount');
                if (websiteCountSpan) {
                    websiteCountSpan.textContent = websiteCountN2;
                } else {
                    console.error('Element with id "websiteCount" not found.');
                }
            }
        })
        .catch(error => {
            console.error('Error fetching Google Sheet data:', error);
        });
});
