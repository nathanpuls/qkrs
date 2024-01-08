    document.getElementById('redirectForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const inputValue = inputField.value.trim();
  let siteCode = '';
  let remainingLetters = '';

  if (inputValue.length > 0) {
    const delimiterIndex = inputValue.indexOf(' ');

    if (delimiterIndex !== -1) {
      siteCode = inputValue.slice(0, delimiterIndex).trim();
      remainingLetters = inputValue.slice(delimiterIndex + 1).trim();
    } else {
      siteCode = inputValue;
    }

    if (siteCode.length > 0) {
      if (remainingLetters.length > 0) {
        updateDisplayedUrl(siteCode, remainingLetters);
        window.location.href = `https://${siteCode}.qk.rs/${remainingLetters}`;
      } else {
        window.location.href = `https://${siteCode}.qk.rs`;
      }
    }
  }

  console.log('siteCode:', siteCode);
  console.log('remainingLetters:', remainingLetters);
});
