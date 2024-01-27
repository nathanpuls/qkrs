window.addEventListener('load', function () {
    // Get the value of the 'name' parameter from the URL
    var urlParams = new URLSearchParams(window.location.search);
    var nameWithDot = urlParams.get('name');

    // Check if the 'name' parameter is present and contains a dot
    if (nameWithDot && nameWithDot.includes('.') && !window.location.href.includes('https://wyr.es/')) {
      // Extract the name after the dot
      var name = nameWithDot.split('.')[1];

      // Log the extracted name to the console
      console.log('Extracted name:', name);

      // Change the URL without triggering a page reload
      window.location.replace('https://wyr.es/' + name);
    }
  });