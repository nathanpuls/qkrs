document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("inputField");
    
    // Array of different placeholders
    const placeholders = [
      "Try: a shoes (Amazon)",
      "Try: nr dress (Nordstrom Rack)",
      "Try: sh party guests (Google Sheets)",
      "Type a website, then a search",
      // Add more placeholders as needed
    ];
  
    // Randomly select a placeholder
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    const randomPlaceholder = placeholders[randomIndex];
  
    // Set the placeholder for the input field
    inputField.placeholder = randomPlaceholder;
  });
  