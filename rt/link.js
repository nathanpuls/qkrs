// Function to detect and show the first link in the input
function detectLink() {
    var textarea = document.getElementById('textInput');
    var linkButton = document.getElementById('linkButton');
    var inputText = textarea.value;

    // Regular expression to match a URL without the need for http://, https://, or www.
    var urlRegex = /(?:[a-zA-Z0-9-]+\.)[a-zA-Z]{2,6}(?:\/[^\s]*)?/;
    var foundLink = inputText.match(urlRegex);

    if (foundLink) {
        // If a valid link is found, show the link icon
        linkButton.style.display = 'block';
        linkButton.setAttribute('data-url', foundLink[0]);  // Store the URL in the icon's data attribute
    } else {
        // Hide the link icon if no link is found
        linkButton.style.display = 'none';
    }
}

// Function to redirect the page to the found URL
function redirectToLink() {
    var linkButton = document.getElementById('linkButton');
    var url = linkButton.getAttribute('data-url');
    
    if (url) {
        // If the link doesn't start with http:// or https://, add https:// to it
        if (!/^https?:\/\//.test(url)) {
            url = 'https://' + url;  // Add https:// if not present
        }
        window.location.href = url;  // Redirect to the URL
    }
}

// Add event listener to detect link when the input changes
document.getElementById('textInput').addEventListener('input', detectLink);

// Add event listener to redirect when the link icon is clicked
document.getElementById('linkButton').addEventListener('click', redirectToLink);


