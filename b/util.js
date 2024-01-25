function clearAll() {
    const urlGrid = document.getElementById('urlGrid');
    urlGrid.innerHTML = ''; // Clear all URL items in the grid
    updateUrlParameters(); // Update URL parameters after clearing
    document.getElementById('urlInput').value = '';
    document.getElementById('urlInput').focus();
    }
    function deleteUrl(urlItem) {
        urlItem.remove();
        updateUrlParameters();
        document.getElementById('urlInput').focus();
    }