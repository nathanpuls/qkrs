function redirectBasedOnParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let s = urlParams.get("s");
    let a = urlParams.get("a");

    // Testing purposes
    //s = 'b';
    a = 'twins';

    s = s || ''; // Make sure s is not null or undefined
    a = a || ''; // Make sure a is not null or undefined

    // Fetch Google Sheet data to populate redirection rules
    const API_KEY = 'AIzaSyDtBiP0s5TwGX9_G9iMHyke4b1k86JT8i4';
    const spreadsheetId = '1A5oU3WMTWRg8tS2VtJeSmTr7E0tmhfRgUszl9HudCs0';
    const range = 'Sheet1!A:E'; // Include column E in the range
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

            if (data.values && data.values.length > 0) {
                data.values.forEach(row => {
                    const key = row[0] || '';
                    const value = row[1] || '';
                    const redirectUrl = row[4] || '';

                    redirectionRules[key] = { value, redirectUrl };
                });
            } 

            // Check if parameter 'a' is empty or not
            if (!a) {
                // If 'a' is empty, redirect to the URL in column E (index 4)
                const redirectRow = redirectionRules[s];
                if (redirectRow && redirectRow.redirectUrl && redirectRow.redirectUrl.startsWith('http')) {
                    console.log(redirectRow.redirectUrl);
                    window.location.href = redirectRow.redirectUrl;
                } else {
                    console.error("Invalid or missing site parameter1");
                    //window.location.href = '../404.html'; //comment out when testing
                    window.location.href = `${s}.wyr.es`;
                    console.log('1 ' + a);
                }
            } else {
                // If 'a' is not empty, use the existing logic
                let redirectLink = redirectionRules[s] ? redirectionRules[s].value.replace(/\$/, a) : null;

                if (!redirectLink || !redirectLink.startsWith('http')) {
                    console.error("Invalid or missing site parameter2");
                    //window.location.href = '../404.html';
                  window.location.href = `${s}.ends.at`;
  
                  console.log('2: ' + a)
                } else {
                    console.log(redirectLink);
                    window.location.href = redirectLink;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            window.location.href = '../index.html';
        });
}  

window.onload = function () {
    if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
        window.location.href = '../index.html';
    } else {
        redirectBasedOnParams();
    }
};
