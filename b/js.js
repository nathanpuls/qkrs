
function clearAll() {
const urlGrid = document.getElementById('urlGrid');
urlGrid.innerHTML = ''; // Clear all URL items in the grid
updateUrlParameters(); // Update URL parameters after clearing
document.getElementById('urlInput').value = '';
document.getElementById('urlInput').focus();
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function addUrlToGrid(url) {
    const urlGrid = document.getElementById('urlGrid');

    // Check if dot is present in the URL
    const dotIndex = url.indexOf('.');
    const isClickable = dotIndex !== -1;

    // Create URL item
    const urlItem = document.createElement('div');
    urlItem.className = 'urlItem';

    // Set onclick for both clickable and unclickable URLs
    urlItem.onclick = function () {
        if (isClickable) {
            window.open(`http://${url}`, '_blank'); // Prepend "http://"
        }
    };

    if (isClickable) {
        // Create favicon image
        const favicon = document.createElement('a');
        favicon.className = 'favicon';
        const faviconImage = document.createElement('img');
        faviconImage.src = `https://www.google.com/s2/favicons?domain=${getDomain(url)}&sz=30`;
        favicon.appendChild(faviconImage);

        // Append favicon to URL item
        urlItem.appendChild(favicon);
    }

    // Create URL text without "http://" or "https://"
    const cleanedUrl = getCleanedUrl(url);
    const urlText = document.createElement('span');
    urlText.textContent = cleanedUrl;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = '';

    // Set onclick for both clickable and unclickable URLs
    deleteButton.onclick = function (event) {
        event.stopPropagation();
        deleteUrl(urlItem);
    };

    // Append URL text and delete button to URL item
    urlItem.appendChild(urlText);
    urlItem.appendChild(deleteButton);

    // Append URL item to URL grid
    urlGrid.appendChild(urlItem);
}






function getCleanedUrl(url) {
    return url.replace(/^(https?:\/\/)?(www\.)?/i, '');
}


function deleteUrl(urlItem) {
    urlItem.remove();
    updateUrlParameters();
    document.getElementById('urlInput').focus();
}

function initializeUrlsFromParams() {
    const urlParam = getUrlParameter('url');

    // Clear existing URLs on the page
    const urlGrid = document.getElementById('urlGrid');
    urlGrid.innerHTML = '';

    if (urlParam) {
        const urls = urlParam.split(',');

        // Add URLs from parameters
        urls.forEach(url => {
            addUrlToGrid(decodeURIComponent(url));
        });
    }
}



function addUrl() {
    const urlInput = document.getElementById('urlInput');
    const rawUrls = urlInput.value.trim();

    if (rawUrls !== '') {
        // Split by commas, spaces, or both
        const urls = rawUrls.split(/[,]+/).filter(url => url.trim() !== '');

        urls.forEach(rawUrl => {
            // Decode the URL and clean it before adding
            const url = decodeURIComponent(rawUrl.trim());
            
            if (url !== '') {
                addUrlToGrid(url);
            }
        });

        updateUrlParameters();
        urlInput.value = '';
    }
}



function updateUrlParameters() {
    const urlItems = document.querySelectorAll('.urlItem span');
    const urls = Array.from(urlItems).map(span => encodeURIComponent(span.textContent));
    const newUrlWithParams = `${window.location.origin}${window.location.pathname}?url=${urls.join(',')}`;
    window.history.pushState({}, document.title, newUrlWithParams);
}





function getDomain(url) {
// Remove "http://", "https://", and "www." prefixes
const cleanedUrl = url.replace(/^(https?:\/\/)?(www\.)?/i, '');

// Extract domain from cleaned URL
const match = cleanedUrl.match(/^(?:[^@\n]+@)?([^:\/\n]+)/im);

return match ? match[1] : '';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addUrl();
    }
}

window.onload = function () {
    initializeUrlsFromParams();
    updateUrlParameters();
};

window.addEventListener('popstate', function () {
    initializeUrlsFromParams();
});


