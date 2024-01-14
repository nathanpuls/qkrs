//const inputField = document.getElementById("inputField");
const suggestionsDiv = document.getElementById("suggestions");



// Replace with your actual Google Sheets API key
const API_KEY = "AIzaSyDtBiP0s5TwGX9_G9iMHyke4b1k86JT8i4";
const spreadsheetId = "1A5oU3WMTWRg8tS2VtJeSmTr7E0tmhfRgUszl9HudCs0";
const range = "Sheet1!A:C";

// Function to fetch data from Google Sheets
async function fetchSuggestions() {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    const suggestionsList = data.values
      ? data.values
          .slice(1)
          .map((row) =>
            row[0] !== undefined ? `${row[0]} | ${row[2] || ""}` : ""
          )
      : [];

    return suggestionsList;
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    return [];
  }
}


inputField.addEventListener("input", async function () {
  const inputValue = inputField.value.toLowerCase();
  const suggestionsList = await fetchSuggestions();
const filteredSuggestions = suggestionsList
  .filter((suggestion) => {
    const [termFromColumnA, termFromColumnD] = suggestion.split(" | ");
    const lowerCaseTermA = termFromColumnA.toLowerCase();
    const lowerCaseInput = inputValue.toLowerCase();

    return (
      lowerCaseTermA.startsWith(lowerCaseInput) ||
      termFromColumnD.toLowerCase().includes(lowerCaseInput)
    );
    
  })



  .sort((a, b) => {
    const [termA, termD_A] = a.split(" | ");
    const [termB, termD_B] = b.split(" | ");
    const lowerCaseInput = inputValue.toLowerCase();

    // Prioritize suggestions that start with the input in column A
    const startsWithInputA = termA.toLowerCase().startsWith(lowerCaseInput);
    const startsWithInputB = termB.toLowerCase().startsWith(lowerCaseInput);

    if (startsWithInputA && !startsWithInputB) {
      return -1;
    } else if (!startsWithInputA && startsWithInputB) {
      return 1;
    }

    // If both start with the input or neither, maintain their order
    return 0;
  })
  .slice(0, 5); // Limit to a maximum of 5 suggestions for display



  let highlightedIndex = -1;

  //suggestions without immediate insertion into input

  /*document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    suggestionsDiv.innerHTML = "";
    suggestionsDiv.style.borderTop = "none";
    suggestionsDiv.style.display = "none";
  } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    highlightedIndex = Math.min(
      Math.max(highlightedIndex + direction, 0),
      filteredSuggestions.length - 1
    );
    updateHighlightedSuggestion();
  } else if (event.key === "Enter" && highlightedIndex !== -1) {
    const [termFromColumnA] = filteredSuggestions[highlightedIndex].split(" | ");
    inputField.value = termFromColumnA + " ";
    suggestionsDiv.innerHTML = "";
    inputField.focus();
  }
});*/

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    suggestionsDiv.innerHTML = "";
    suggestionsDiv.style.borderTop = "none";
    suggestionsDiv.style.display = "none";
  } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    highlightedIndex = Math.min(
      Math.max(highlightedIndex + direction, 0),
      filteredSuggestions.length - 1
    );
    updateHighlightedSuggestion();

    // Update input field immediately when navigating through suggestions
    if (highlightedIndex !== -1) {
      const [termFromColumnA] = filteredSuggestions[highlightedIndex].split(" | ");
      inputField.value = termFromColumnA + " ";
    }
  
  }
});


  function updateHighlightedSuggestion() {
    const suggestionElements = document.querySelectorAll(".suggestion-item");
    suggestionElements.forEach((suggestionElement, index) => {
      suggestionElement.classList.remove("highlighted");
      if (index === highlightedIndex) {
        suggestionElement.classList.add("highlighted");
      }
    });
  }

  // Hide suggestions when input is empty
  if (!inputValue) {
    suggestionsDiv.style.display = "none";
    return;
  }

  suggestionsDiv.innerHTML = "";
  filteredSuggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement("div");
    const [termFromColumnA, termFromColumnD] = suggestion.split(" | ");
    suggestionElement.innerHTML = `<strong>${termFromColumnA}</strong> | ${termFromColumnD}`;
    suggestionElement.classList.add("suggestion-item");
    suggestionElement.addEventListener("click", function () {
      inputField.value = termFromColumnA;
      inputField.value += " "; // Append a space
      suggestionsDiv.innerHTML = "";
      inputField.focus(); // Set focus to the input field
    });
    suggestionsDiv.appendChild(suggestionElement);
  });

  // Show or hide suggestions based on input presence
  if (filteredSuggestions.length === 0) {
    suggestionsDiv.style.display = "none";
    suggestionsDiv.style.height = "0";
  } else {
    suggestionsDiv.style.display = "block";
    suggestionsDiv.style.height = "auto"; // Reset height to auto
  }
});

// Close suggestions when clicking outside the input and suggestions box
document.addEventListener("click", function (event) {
  if (
    !inputField.contains(event.target) &&
    !suggestionsDiv.contains(event.target)
  ) {
    suggestionsDiv.innerHTML = "";
    suggestionsDiv.style.borderTop = "none"; // Ensure border is set to none
    suggestionsDiv.style.display = "none";
  }
});
