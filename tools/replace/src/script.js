// Function to get URL parameter by name
function getUrlParameter(name) {
    const urlParams = new URL(window.location.href);
    const value = urlParams.searchParams.get(name);

    // Preserve the '+' character
    return value ? value.replace(/\+/g, '%2B') : null;
}

// Extract values from URL parameters and manually replace + with %2B
const urlParamFindValue = (getUrlParameter('findValue') || "elf").replace(/%20/g, ' ').replace(/\+/g, '%2B');
const urlParamReplaceValue = (getUrlParameter('replaceValue') || "$").replace(/%20/g, ' ').replace(/\+/g, '%2B');

// Set the input values for testing
document.getElementById('findInput').value = urlParamFindValue;
document.getElementById('replaceInput').value = urlParamReplaceValue;

// Trigger the conversion function
convertUrl();

document.getElementById('urlInput').addEventListener('input', function() {
    // Automatically trigger conversion on URL input change
    convertUrl();
});

function convertUrl() {
    const urlInput = document.getElementById('urlInput').value;

    // Get findValue and replaceValue directly from URL parameters
    const findValue = urlParamFindValue;
    const replaceValue = urlParamReplaceValue;

    // Perform URL conversion logic here
    const convertedUrl = processUrl(urlInput, findValue, replaceValue);

    // Display the result using innerHTML
    document.getElementById('result').innerHTML = convertedUrl;
}

function processUrl(url, find, replace) {
    // Perform your URL processing logic here
    // Example: Replace 'find' with 'replace' in the query parameters
    const regex = new RegExp(find, 'g');
    const updatedUrl = url.replace(regex, replace);

    return updatedUrl;
}

function copyToClipboard() {
    const resultText = document.getElementById('result').innerText;

    // Create a textarea element, set its value, and select the text
    const textarea = document.createElement('textarea');
    textarea.value = resultText;
    document.body.appendChild(textarea);
    textarea.select();

    // Execute copy command
    document.execCommand('copy');

    // Remove the textarea
    document.body.removeChild(textarea);

    // Update button text to 'Copied!'
    document.getElementById('copyButton').innerText = 'Copied!';

    setTimeout(function() {
        document.getElementById('copyButton').innerText = 'Copy to Clipboard';
    }, 1000);
}
