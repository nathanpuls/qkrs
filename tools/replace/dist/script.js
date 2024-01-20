// Hardcoded test values
const testUrl = "https://www.youtube.com/results?search_query=elf+trailer";
const testFindValue = "elf";
const testReplaceValue = "$";

// Set the input values for testing
document.getElementById('urlInput').value = testUrl;
document.getElementById('findInput').value = testFindValue;
document.getElementById('replaceInput').value = testReplaceValue;

// Trigger the conversion function
convertUrl();

document.getElementById('urlInput').addEventListener('input', function() {
    // Automatically trigger conversion on URL input change
    convertUrl();
});

function convertUrl() {
    const urlInput = document.getElementById('urlInput').value;
    const findInput = document.getElementById('findInput').value;
    const replaceInput = document.getElementById('replaceInput').value;

    // Perform URL conversion logic here
    const convertedUrl = processUrl(urlInput, findInput, replaceInput);

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