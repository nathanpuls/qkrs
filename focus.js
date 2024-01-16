// Assuming you have an input element with the id 'inputField'
//const inputField = document.getElementById("inputField");

// Function to focus on the input field
function focusOnInput() {
  inputField.focus();
}

// Listen for the 'q', 'Enter', or 'Spacebar' key on page load
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", function (event) {
    const allowedKeys = ["q", "Enter", " ", "s"];

    if (allowedKeys.includes(event.key)) {
      event.preventDefault(); // Prevent the default action for the allowed keys
      focusOnInput();
    }
  });

  // Optionally, focus on the input field directly when the page loads
  focusOnInput();
});
