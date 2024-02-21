

//const { siteCodeSelect } = window.qkrs;

//siteCodeSelect();

//window.qkrs = window.qkrs || {}; // Create a global namespace

// window.qkrs.testImport = function() {
// console.log('test import');
// }
// Access the variable from script1.js
//console.log(window.passTermA);
//window.passTermB = "Hello from Script qkrs!";

// document.addEventListener('DOMContentLoaded', function() {
//   // Access the variable using the window object
//   console.log(window.passTermA);
// });



//console.log('js1 '+ window.siteCodeValue); broken

//yet another autofocus
// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById('inputField').focus();
// });



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
  
  const brandName = 'qk.rs';
  const tagline = '';
  const urlExample = `${brandName} ${tagline}`; // Change this to your desired URL

  if (inputField.value === "") {
    urlDisplay.textContent = urlExample;
  }
}

// Event listener to detect input changes
document.getElementById("inputField").addEventListener("input", setURLDisplay);

// Check if input is empty initially
setURLDisplay();

//end


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
    // The page is loaded from the bfcache (Back-Forward Cache)
    inputField.value = ""; // Clear the input field
    
    
    urlDisplay.textContent = urlExample;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("inputField");
  const goButton = document.getElementById("submitButton");
  
  
  const urlDisplay = document.getElementById("urlDisplay");
  
  suggestionsDiv.style.display = "none"; // Hide suggestions on page load


  

  function updateDisplayedUrl(siteCode, remainingLetters) {
    const url = `${siteCode}.qk.rs/${remainingLetters}`;

    //REMOVING THIS REMOVES PROBLEM OF HAVING TO REVERT BACK TO THE URL
    //urlDisplay.textContent = 'quack'; //urlExample; // when var is 'url' it's scrunched up - see if CSS can fix later
  }

  inputField.addEventListener("input", function () {
    console.log("Input event triggered"); // Add this line

    const inputValue = inputField.value.trim();

    if (inputValue.length > 0) {
      const delimiterIndex = inputValue.indexOf(" ");
      const remainingLetters =
        delimiterIndex !== -1
          ? inputValue.slice(delimiterIndex + 1).trim().replace(/\s+/g, '+')
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

        urlDisplay.textContent = displayUrl.toLowerCase(); // urlDisplay to lowercase
   
      } else {
        
        urlDisplay.textContent = urlExample;
      }
    } else {
    
      urlDisplay.textContent = urlExample;
    }
  });

  document.getElementById("redirectForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const inputValue = inputField.value.trim();
    const delimiterIndex = inputValue.indexOf(" ");
  
    let siteCode = "";
    let remainingLetters = "";
  
    if (inputValue.length > 0) {
      // Remove this inner declaration to avoid conflicts
      // const delimiterIndex = inputValue.indexOf(" ");
  
      if (delimiterIndex !== -1) {
        siteCode = inputValue.slice(0, delimiterIndex).trim();
        remainingLetters = inputValue.slice(delimiterIndex + 1).trim();
      } else {
        siteCode = encodeURIComponent(inputValue);
      }
  
      if (siteCode.length > 0) {
        if (remainingLetters.length > 0) {
          updateDisplayedUrl(siteCode, remainingLetters); // later
          siteCode = encodeURIComponent(siteCode);
          remainingLetters =encodeURIComponent(remainingLetters);
          window.location.href = `https://${siteCode}.qk.rs/${remainingLetters}`;
        } else {
          siteCode = encodeURIComponent(siteCode);
          window.location.href = `https://${siteCode}.qk.rs`;
        }
      }
    }
  
    console.log("siteCode:", siteCode);
    console.log("remainingLetters:", remainingLetters);
  });
  
});

const copyIcon = document.getElementById("urlDisplay"); //ID was copyIcon
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
    url = `https://${siteCode}.qk.rs/${remainingLetters || ''}`;
  }
  
  url = url.toLowerCase().replace(/^https:\/\//, '').replace(/\s+/g, '+');
  



  navigator.clipboard
    .writeText(url)
    .then(() => {
      copyIcon.innerHTML = 'copied!';
      console.log(url);
      setTimeout(function () {
        copyIcon.innerHTML = url.replace(/^https:\/\//, ''); // old '<i class="far fa-copy"></i>'
        inputField.focus(); // Set focus back to the input field
      }, 1000);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
});




