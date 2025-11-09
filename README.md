# Modern Login Page

A beautiful, modern login page with glassmorphism design and Google authentication.

## Features

- ✨ Glassmorphism UI design with animated background
- 🔐 Email and password login form
- 👁️ Password visibility toggle
- 🔵 Google Sign-In integration
- 📱 Responsive design
- 🎨 Beautiful blue gradient theme

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling with glassmorphism effects
- `script.js` - JavaScript for interactivity and Google login
- `GOOGLE_LOGIN_SETUP.md` - Detailed guide for setting up Google authentication

## Quick Start

1. Open `index.html` in a web browser
2. For local development, you can use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server -p 8000
   ```
3. Navigate to `http://localhost:8000`

## Google Login Setup

To enable Google login functionality, follow the detailed instructions in [GOOGLE_LOGIN_SETUP.md](./GOOGLE_LOGIN_SETUP.md).

**Quick Summary:**
1. Create a project in Google Cloud Console
2. Enable Google Identity Services API
3. Create OAuth 2.0 credentials
4. Update `YOUR_GOOGLE_CLIENT_ID` in `script.js`
5. Set up backend authentication endpoint

## Customization

- **Logo**: Update the "Your logo" text in `index.html`
- **Colors**: Modify the gradient colors in `styles.css`
- **Background Shapes**: Adjust the `.shape` classes in `styles.css`
- **Form Fields**: Add or remove fields in the `login-form` section

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use and modify for your projects.

