function getFaviconUrl(url) {
    console.log('getFaviconUrl called with:', url);

    // Add http:// if the URL doesn't include a protocol (http/https)
    const normalizedUrl = url.startsWith('http') ? url : 'http://' + url;
    console.log('Normalized URL for favicon:', normalizedUrl);

    // Create a link element to extract the hostname
    const link = document.createElement('a');
    link.href = normalizedUrl;

    // Return the favicon URL from the hostname
    const faviconUrl = link.protocol + '//' + link.hostname + '/favicon.ico';
    console.log('Favicon URL:', faviconUrl);
    return faviconUrl;
}

function displayFaviconFromInput() {
    const inputField = document.getElementById('textInput');
    const linkButton = document.getElementById('linkButton');
    const url = inputField.value.trim();
    console.log('Input URL:', url);

    // Improved regex pattern to validate URLs (handles cases like hey.com, www.hey.com, https://www.hey.com, etc.)
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(\/[^\s]*)?$/;
    console.log('URL pattern match result:', urlPattern.test(url));

    if (urlPattern.test(url)) {
        console.log('Valid URL detected:', url);

        // If a valid URL is detected (doesn't need http:// or https://)
        const faviconUrl = getFaviconUrl(url);

        // Show the linkButton
        linkButton.style.display = 'block';
        console.log('Link button displayed');

        // Create or update the image element with the favicon
        let faviconImage = linkButton.querySelector('img');
        if (!faviconImage) {
            faviconImage = document.createElement('img');
            linkButton.appendChild(faviconImage);
            console.log('New favicon image created');
        }

        // Update favicon image source if it has changed
        if (faviconImage.src !== faviconUrl) {
            faviconImage.src = faviconUrl;
            faviconImage.alt = '';
            faviconImage.style.width = '16px';  // Adjust the size as needed
            faviconImage.style.height = '16px';
            console.log('Favicon image source set to:', faviconUrl);
        }

        // When the linkButton is clicked, redirect to the URL without changing the input
        linkButton.onclick = function() {
            const finalUrl = url.startsWith('http') ? url : 'http://' + url;
            console.log('Redirecting to:', finalUrl);
            window.location.href = finalUrl;
        };
    } else {
        console.log('Invalid URL input, hiding link button');
        // If input is not a valid URL, hide the linkButton
        linkButton.style.display = 'none';
    }
}

// Add an event listener to detect input changes
document.getElementById('textInput').addEventListener('input', displayFaviconFromInput);
