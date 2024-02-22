let s, a, searchParam;
let googleSearchUrl;

// s = encodeURIComponent(s);
// a =encodeURIComponent(a);

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkAndLogValues() {
  console.log("Checking and logging values...");
  searchParam = getParameterByName("q");

  if (searchParam) {
    console.log("Search parameter found:", searchParam);

    var decodedParam = decodeURIComponent(searchParam);

    var splitParams = decodedParam.split(" ");
    s = splitParams.shift();
    a = splitParams.join("+");

    searchParam = s + "+" + a;

    console.log("a26: " + a);

    console.log("Value of s:", s);
    console.log("Value of a:", a);
  } else {
    console.log("No search parameter found.");
  }
}

function redirectBasedOnParams() {
  s = s || "";
  a = a || "";

//   let googleSearchUrl;

  const API_KEY = "AIzaSyDtBiP0s5TwGX9_G9iMHyke4b1k86JT8i4";
  const spreadsheetId = "1A5oU3WMTWRg8tS2VtJeSmTr7E0tmhfRgUszl9HudCs0";
  const range = "Sheet1!A:E";
  const sheetLink = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;

  fetch(sheetLink)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      const redirectionRules = {};

      if (data.values && data.values.length > 0) {
        data.values.forEach((row) => {
          const valueA = row[0] || "";
          const valueD = row[3] || "";
          const value = row[1] || "";
          const redirectUrl = row[4] || "";

          if (valueA || valueD) {
            redirectionRules[valueA] = { value, redirectUrl };
            redirectionRules[valueD] = { value, redirectUrl };
          }
        });
      }

      googleSearchUrl = `https://www.google.com/search?q=${searchParam}`;

      const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;

      function hasSpecialCharacters(str) {
        return specialCharactersRegex.test(str);
      }

      let specialCharacters = false;

      if (hasSpecialCharacters(a) || hasSpecialCharacters(s)) {
        a = encodeURIComponent(a);
        s = encodeURIComponent(s);
        searchParam = encodeURIComponent(searchParam);

        specialCharacters = true;


        searchParam = searchParam.replace(/%2B/g, "+");
        googleSearchUrl = `https://www.google.com/search?q=${searchParam}`;
        window.location.href = `https://www.google.com/search?q=${searchParam}`;

        console.log(googleSearchUrl);
      } else {
        if (!a || !specialCharacters) {
          const redirectRow = redirectionRules[s];
          if (
            redirectRow &&
            redirectRow.redirectUrl &&
            redirectRow.redirectUrl.startsWith("http")
          ) {
            console.log("Redirecting to:", redirectRow.redirectUrl);
            window.location.href = redirectRow.redirectUrl;
          } else {
            console.log(s + "sent to wyr.es");
        
            //window.location.href = `https://${s}.wyr.es`;
          }
        } else {
          if (hasSpecialCharacters(a)) {
            a = encodeURIComponent(a);
          }
          console.log(a);

          if (hasSpecialCharacters(s)) {
            s = encodeURIComponent(s);
          }
          console.log(s);

          const redirectLink = redirectionRules[s]
            ? redirectionRules[s].value.replace(/\$/, a)
            : null;

          if (!redirectLink || !redirectLink.startsWith("http")) {
            console.log(googleSearchUrl);
            window.location.href = googleSearchUrl;
          } else {
            console.log("2nd redirect: " + redirectLink);
          }
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

window.onload = function () {
  console.log("DOM is fully loaded.");
  checkAndLogValues();

  if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
    // window.location.href = '../index.html';
  } else {
    redirectBasedOnParams();
  }
};
