// Assuming you have an input element with the id 'inputField'
// const inputField = document.getElementById("inputField");

// Function to focus on the input field
function focusOnInput() {
  inputField.focus();
}

// Flag to check if 'Command+S' or 'Control+S' has been pressed before
let savePressed = false;

// Listen for the 'Command+S' or 'Control+S' key on page load
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", function (event) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const allowedKeys = isMac ? ["Meta", "s"] : ["Control", "s"];

    if (allowedKeys.includes(event.key)) {
      // Check if the input field is not focused before calling focusOnInput()
      if (!inputField.matches(":focus")) {
        focusOnInput();
        savePressed = true;
      } else if (savePressed) {
        event.preventDefault();
        savePressed = false;
      }
    }
  });

  // Optionally, focus on the input field directly when the page loads
  focusOnInput();
});
