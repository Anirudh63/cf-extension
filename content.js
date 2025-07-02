// This content script extracts the Codeforces username from the page and responds to popup requests
function getCodeforcesUsername() {
  // Username is usually in the top right, inside a <div class="lang-chooser"> or <a href="/profile/USERNAME">
  const profileLink = document.querySelector('a[href^="/profile/"]');
  if (profileLink) {
    // Extract username from the href
    const match = profileLink.getAttribute('href').match(/\/profile\/(.+)/);
    if (match) {
      return match[1];
    }
  }
  return null;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_CF_USERNAME') {
    const username = getCodeforcesUsername();
    sendResponse({ username });
  }
}); 