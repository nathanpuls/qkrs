// const searchBox = document.getElementById("search-box");
const actionsContainer = document.querySelector(".actions");

console.log("Debugging links.js script loaded successfully.");

// Function to extract links from input
const extractLinks = (text) => {
  const urlRegex = /https?:\/\/[^\s]+|(?:[a-z0-9-]+\.)+[a-z]{2,}/gi;
  const matches = text.match(urlRegex) || [];
  console.log("Extracted links:", matches);
  return matches;
};

// Function to construct a valid favicon URL
const getFaviconUrl = (url) => {
  let formattedUrl = url.startsWith("http") ? url : `https://${url}`;
  try {
    const origin = new URL(formattedUrl).origin;
    const faviconUrl = `${origin}/favicon.ico`;
    console.log("Favicon URL for", url, "is", faviconUrl);
    return faviconUrl;
  } catch (error) {
    console.error("Error constructing favicon URL for", url, ":", error);
    return null;
  }
};

// Function to update favicons
const updateFavicons = () => {
  console.log("Updating favicons...");

  // Remove existing favicons
  document.querySelectorAll(".favicon, .favicon-link").forEach((icon) => icon.remove());
  console.log("Cleared existing favicons.");

  // Extract links from the input
  const links = extractLinks(searchBox.value);

  // Add favicons for each link
  links.forEach((link) => {
    const faviconUrl = getFaviconUrl(link);
    if (faviconUrl) {
      const linkWrapper = document.createElement("a"); // Create a clickable wrapper
      linkWrapper.href = link.startsWith("http") ? link : `https://${link}`; // Ensure proper URL format
    //   linkWrapper.target = "_blank"; 
      linkWrapper.className = "favicon-link"; // Class for easier cleanup

      const favicon = document.createElement("img");
      favicon.src = faviconUrl;
      favicon.alt = "favicon";
      favicon.className = "favicon";
      favicon.style.width = "24px";
      favicon.style.height = "24px";
      favicon.style.borderRadius = "50%";
      favicon.style.marginTop = "10px";
      favicon.style.display = "block";

      favicon.onerror = () => {
        // Handle broken favicon URLs
        console.warn("Favicon failed to load for", link, "using URL", faviconUrl);
        //favicon.src = "https://via.placeholder.com/24?text=X";
        favicon.src = "https://qk.rs/favicon.ico";
      };

      linkWrapper.appendChild(favicon); // Add image to anchor
      actionsContainer.appendChild(linkWrapper); // Add to the DOM
      console.log("Appended clickable favicon for", link);
    } else {
      console.warn("Favicon URL is null for", link);
    }
  });
};

// Listen for input changes
searchBox.addEventListener("input", () => {
  console.log("Input event triggered. Current value:", searchBox.value);
  updateFavicons();
});

// Initial update on page load
window.addEventListener("load", () => {
  console.log("Window loaded. Initializing favicons...");
  updateFavicons();
});

console.log("Debugging links.js script loaded successfully.");
