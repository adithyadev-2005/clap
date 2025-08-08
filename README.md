# Clap to Scroll App

A fun web application that allows you to scroll through content by clapping! The app uses your microphone to detect clapping sounds and scrolls the page accordingly.

## Features

- Microphone-based clap detection
- Smooth scrolling based on clap intensity
- Audio feedback (applause for strong claps, booing for weak ones)
- Responsive design

## Deployment on Vercel

This app is configured to work properly on Vercel with the following setup:

### Requirements

1. **HTTPS**: The app requires HTTPS to access the microphone (Vercel provides this automatically)
2. **Modern Browser**: Chrome, Firefox, Safari, or Edge with microphone support
3. **Microphone**: A working microphone connected to your device

### Deployment Steps

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Deploy - Vercel will automatically detect it as a static site

### Troubleshooting Permission Issues

If you see "permission denied" errors:

1. **Check HTTPS**: Ensure you're accessing the site via HTTPS (Vercel provides this automatically)
2. **Allow Microphone**: When prompted, click "Allow" for microphone access
3. **Browser Permissions**: Check your browser's microphone permissions:
   - Chrome: Settings > Privacy and security > Site Settings > Microphone
   - Firefox: Settings > Privacy & Security > Permissions > Microphone
   - Safari: Safari > Preferences > Websites > Microphone

4. **Refresh the Page**: After allowing permissions, refresh the page
5. **Check Console**: Open browser developer tools (F12) to see detailed error messages

### Common Issues

- **"Microphone access denied"**: User didn't allow microphone permissions
- **"No microphone found"**: No microphone is connected or detected
- **"HTTPS required"**: The site must be accessed via HTTPS (Vercel handles this)

## Local Development

To run locally:

1. Clone the repository
2. Open `index.html` in a modern browser
3. Allow microphone permissions when prompted

Note: Local development works on `localhost` without HTTPS, but production deployment requires HTTPS.

## Files

- `index.html` - Main HTML structure
- `script.js` - JavaScript functionality for clap detection and scrolling
- `style.css` - Styling and animations
- `vercel.json` - Vercel configuration for proper deployment
