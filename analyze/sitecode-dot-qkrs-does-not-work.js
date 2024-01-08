document.getElementById('redirectForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const inputValue = inputField.value.trim();

        if (inputValue.length > 0) {
          const delimiterIndex = inputValue.indexOf(' ');

          if (delimiterIndex !== -1) {
            const siteCode = inputValue.slice(0, delimiterIndex).trim();
            const remainingLetters = inputValue.slice(delimiterIndex + 1).trim();

            if (siteCode.length > 0 && remainingLetters.length > 0) {
              updateDisplayedUrl(siteCode, remainingLetters);
              window.location.href = `https://${siteCode}.qk.rs/${remainingLetters}`;

            } else if (siteCode.length > 0 && remainingLetters.length === 0) {
              window.location.href = `https://${siteCode}.qk.rs`;
            }
          }
        }
      });
