# CF Unaccepted Problems

This Chrome extension lists your Codeforces problems that you attempted but didn't solve, sorted by difficulty.

## Features
- **Automatic Username Detection:** When you open the popup on a codeforces.com page while logged in, your handle is detected automatically.
- **Auto-Fetch:** The extension immediately fetches and displays your unsolved problems, sorted by difficulty.
- **Manual Entry:** You can still enter any handle manually if you wish.

## Installation
1. Download or clone this repository.
2. Go to `chrome://extensions` in your browser.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select this folder.

## Usage
1. Log in to your Codeforces account.
2. While on any codeforces.com page, click the extension icon.
3. Your handle will be auto-filled and your unsolved problems will be fetched and displayed.
4. If you want to check another user, enter their handle manually and click "Fetch".

## Permissions
- The extension only runs its content script on codeforces.com to detect your username.
- No data is stored or sent anywhere except to the official Codeforces API.
