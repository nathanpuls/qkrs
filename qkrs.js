function resetInputAndFocus() {
  document.getElementById('inputField').value = '';
  document.getElementById('inputField').focus();
}

// Add an event listener for the window.onload event
window.addEventListener('load', resetInputAndFocus);

//reset urlDisplay

function setURLDisplay() {
  const inputField = document.getElementById("inputField");
  const urlDisplay = document.getElementById("urlDisplay");
  const urlExample = "qk.rs"; // Change this to your desired URL

  if (inputField.value === "") {
    urlDisplay.textContent = urlExample;
  }
}

// Event listener to detect input changes
document.getElementById("inputField").addEventListener("input", setURLDisplay);

// Check if input is empty initially
setURLDisplay();

//end

const inputField = document.getElementById("inputField");
const clearInput = document.getElementById("clearInput");

inputField.addEventListener("input", function () {
  clearInput.style.display = this.value.trim() !== "" ? "inline-block" : "none";
});

clearInput.addEventListener("click", function () {
  inputField.value = "";
  clearInput.style.display = "none";
  inputField.focus();
  urlDisplay.textContent = urlExample;
});

const urlExample = "qk.rs";
const dim = "0.2";

window.addEventListener("pageshow", function (event) {
  var inputField = document.getElementById("inputField");
  if (
    event.persisted ||
    (window.performance && window.performance.navigation.type === 2)
  ) {
    // The page is loaded from the bfcache (Back-Forward Cache)
    inputField.value = ""; // Clear the input field
    // Additionally, adjust the opacity of buttons as needed
    document.getElementById("submitButton").style.opacity = dim;
    document.getElementById("copyButton").style.opacity = dim;
    document.getElementById("clearButton").style.opacity = dim;
    urlDisplay.textContent = urlExample;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("inputField");
  const goButton = document.getElementById("submitButton");
  const copyButton = document.getElementById("copyButton");
  const clearButton = document.getElementById("clearButton"); // Added this line
  const urlDisplay = document.getElementById("urlDisplay");

  function updateDisplayedUrl(siteCode, remainingLetters) {
    const url = `${siteCode}.qk.rs/${remainingLetters}`;
    urlDisplay.textContent = url;
  }

  inputField.addEventListener("input", function () {
    console.log("Input event triggered"); // Add this line

    const inputValue = inputField.value.trim();

    if (inputValue.length > 0) {
      const delimiterIndex = inputValue.indexOf(" ");
      const remainingLetters =
        delimiterIndex !== -1
          ? inputValue.slice(delimiterIndex + 1).trim()
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

        urlDisplay.textContent = displayUrl;
        goButton.style.opacity = "1";
        copyButton.style.opacity = "1";
        clearButton.style.opacity = "1";
      } else {
        goButton.style.opacity = dim;
        copyButton.style.opacity = dim;
        clearButton.style.opacity = dim;
        urlDisplay.textContent = urlExample;
      }
    } else {
      goButton.style.opacity = dim;
      copyButton.style.opacity = dim;
      clearButton.style.opacity = dim;
      urlDisplay.textContent = urlExample;
    }
  });

  document
    .getElementById("redirectForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const inputValue = inputField.value.trim();
      let siteCode = "";
      let remainingLetters = "";

      if (inputValue.length > 0) {
        const delimiterIndex = inputValue.indexOf(" ");

        if (delimiterIndex !== -1) {
          siteCode = inputValue.slice(0, delimiterIndex).trim();
          remainingLetters = inputValue.slice(delimiterIndex + 1).trim();
        } else {
          siteCode = inputValue;
        }

        if (siteCode.length > 0) {
          if (remainingLetters.length > 0) {
            updateDisplayedUrl(siteCode, remainingLetters);
            window.location.href = `https://${siteCode}.qk.rs/${remainingLetters}`;
          } else {
            window.location.href = `https://${siteCode}.qk.rs`;
          }
        }
      }

      console.log("siteCode:", siteCode);
      console.log("remainingLetters:", remainingLetters);
    });

  copyButton.addEventListener("click", function () {
    const inputValue = inputField.value.trim();
    const delimiterIndex = inputValue.indexOf(" ");
    inputField.focus();

    let siteCode = "";
    let remainingLetters = "";

    if (delimiterIndex !== -1) {
      siteCode = inputValue.slice(0, delimiterIndex).trim();
      remainingLetters = inputValue.slice(delimiterIndex + 1).trim();
    } else {
      siteCode = inputValue;
    }

    let url = "";

    if (remainingLetters.length > 0) {
      url = `${siteCode}.qk.rs/${remainingLetters}`;
    } else {
      url = `https://${siteCode}.qk.rs`;
    }

    navigator.clipboard
      .writeText(url)
      .then(() => {
        copyButton.textContent = "Copied!";
        setTimeout(function () {
          copyButton.textContent = "Copy URL";
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  });

  clearButton.addEventListener("click", function () {
    inputField.value = "";
    clearButton.style.opacity = dim;
    goButton.style.opacity = dim;
    copyButton.style.opacity = dim;
    urlDisplay.textContent = urlExample;
    inputField.focus();
  });
});

const copyIcon = document.getElementById("copyIcon");
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
  } else if (remainingLetters.length > 0) {
    url = `https://${siteCode}.qk.rs/${remainingLetters}`;
  } else {
    url = `https://${siteCode}.qk.rs`;
  }

  navigator.clipboard
    .writeText(url)
    .then(() => {
      copyIcon.innerHTML = '<i class="fas fa-check check-icon"></i>';
      setTimeout(function () {
        copyIcon.innerHTML = '<i class="far fa-copy"></i>';
        inputField.focus(); // Set focus back to the input field
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
});
