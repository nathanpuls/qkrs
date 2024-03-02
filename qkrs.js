function resetInputAndFocus() {
  document.getElementById("inputField").value = "";
  document.getElementById("inputField").focus();
}

window.addEventListener("load", resetInputAndFocus);

function setURLDisplay() {
  const inputField = document.getElementById("inputField");
  const urlDisplay = document.getElementById("urlDisplay");

  const brandName = "qk.rs";
  const tagline = "";
  const urlExample = `${brandName} ${tagline}`;

  if (inputField.value === "") {
    urlDisplay.textContent = urlExample;
  }
}

document.getElementById("inputField").addEventListener("input", setURLDisplay);

setURLDisplay();

const clearInput = document.getElementById("clearInput");

inputField.addEventListener("input", function () {
  clearInput.style.display = this.value.trim() !== "" ? "inline-block" : "none";
});

clearInput.addEventListener("click", function () {
  inputField.value = "";
  clearInput.style.display = "none";
  suggestions.style.display = "none";
  inputField.focus();
  urlDisplay.textContent = urlExample;
});

const urlExample = "qk.rs";

window.addEventListener("pageshow", function (event) {
  var inputField = document.getElementById("inputField");
  if (
    event.persisted ||
    (window.performance && window.performance.navigation.type === 2)
  ) {
    inputField.value = "";

    urlDisplay.textContent = urlExample;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("inputField");
  const goButton = document.getElementById("submitButton");

  const urlDisplay = document.getElementById("urlDisplay");

  suggestionsDiv.style.display = "none";

  function updateDisplayedUrl(siteCode, remainingLetters) {
    const url = `${siteCode}.qk.rs/${remainingLetters}`;
  }

  inputField.addEventListener("input", function () {
    console.log("Input event triggered");

    const inputValue = inputField.value.trim();

    if (inputValue.length > 0) {
      const delimiterIndex = inputValue.indexOf(" ");
      const remainingLetters =
        delimiterIndex !== -1
          ? inputValue
              .slice(delimiterIndex + 1)
              .trim()
              .replace(/\s+/g, "+")
          : "";

      if (remainingLetters.length > 0 || delimiterIndex === -1) {
        const siteCode =
          delimiterIndex !== -1
            ? inputValue.slice(0, delimiterIndex).trim()
            : inputValue;
        const displayUrl =
          remainingLetters.length > 0
            ? `${siteCode}.qk.rs/${remainingLetters}`
            : `${siteCode}.qk.rs`;

        urlDisplay.textContent = displayUrl.toLowerCase();
      } else {
        urlDisplay.textContent = urlExample;
      }
    } else {
      urlDisplay.textContent = urlExample;
    }
  });

  document
    .getElementById("redirectForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const inputValue = inputField.value.trim();
      const delimiterIndex = inputValue.indexOf(" ");

      let siteCode = "";
      let remainingLetters = "";

      if (inputValue.length > 0) {
        if (delimiterIndex !== -1) {
          siteCode = inputValue.slice(0, delimiterIndex).trim();
          remainingLetters = inputValue.slice(delimiterIndex + 1).trim();
          
          

        } else {
          siteCode = inputValue;
        }

        if (siteCode.length > 0) {
          if (remainingLetters.length > 0) {
            updateDisplayedUrl(siteCode, remainingLetters);
            siteCode = encodeURIComponent(siteCode);
            remainingLetters = encodeURIComponent(remainingLetters);
            remainingLetters = remainingLetters.replace(/%20/g, "+");
            
            //window.location.href = `https://${siteCode}.qk.rs/${remainingLetters}`;
            window.location.href = `/search/?q=${siteCode}+${remainingLetters}`;
            console.log(
              `1: https://qk.rs/search/?q=${siteCode}+${remainingLetters}`
            );
          } else {
            siteCode = encodeURIComponent(siteCode);
            //window.location.href = `https://${siteCode}.qk.rs`;
            window.location.href = `/search/?q=${siteCode}`;
            console.log(`2: https://qk.rs/search/?q=${siteCode}`);
          }
        }
      }

      console.log("siteCode:", siteCode);
      console.log("remainingLetters:", remainingLetters);
    });
});

const copyIcon = document.getElementById("urlDisplay");
copyIcon.addEventListener("click", function () {
  const inputValue = document.getElementById("inputField").value.trim();
  const delimiterIndex = inputValue.indexOf(" ");
  let siteCode = "";
  let remainingLetters = "";

  if (delimiterIndex !== -1) {
    siteCode = inputValue.slice(0, delimiterIndex).trim();
    remainingLetters = inputValue.slice(delimiterIndex + 1).trim();
  } else {
    siteCode = inputValue;
  }

  let url = "";

  if (siteCode.trim() === "") {
    url = "https://qk.rs";
  } else {
    url = `https://${siteCode}.qk.rs/${remainingLetters || ""}`;
  }

  url = url
    .toLowerCase()
    .replace(/^https:\/\//, "")
    .replace(/\s+/g, "+");

  navigator.clipboard
    .writeText(url)
    .then(() => {
      copyIcon.innerHTML = "copied!";
      console.log(url);
      setTimeout(function () {
        copyIcon.innerHTML = url.replace(/^https:\/\//, "");
        inputField.focus();
      }, 1000);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
});
