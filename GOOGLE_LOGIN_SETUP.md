# Google Login Setup Guide

This guide will walk you through the steps to enable Google login on your login page.

## Prerequisites

- A Google account
- Access to Google Cloud Console
- A web server (for production) or local development server

## Step-by-Step Instructions

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click **"New Project"**
4. Enter a project name (e.g., "My Login App")
5. Click **"Create"**
6. Wait for the project to be created and select it

### Step 2: Enable Google+ API / Google Identity Services

1. In the Google Cloud Console, navigate to **"APIs & Services"** > **"Library"**
2. Search for **"Google Identity Services API"** or **"Google+ API"**
3. Click on it and click **"Enable"**

### Step 3: Create OAuth 2.0 Credentials

1. Navigate to **"APIs & Services"** > **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**
4. If prompted, configure the OAuth consent screen first:
   - Choose **"External"** (unless you have a Google Workspace)
   - Fill in the required information:
     - App name: Your app name
     - User support email: Your email
     - Developer contact information: Your email
   - Click **"Save and Continue"**
   - Add scopes: `email` and `profile`
   - Click **"Save and Continue"**
   - Add test users (if in testing mode)
   - Click **"Save and Continue"**
   - Review and click **"Back to Dashboard"**

5. Back in Credentials, click **"+ CREATE CREDENTIALS"** > **"OAuth client ID"**
6. Select **"Web application"** as the application type
7. Give it a name (e.g., "Web Client")
8. Add **Authorized JavaScript origins**:
   - For local development: `http://localhost:3000`, `http://localhost:8000`, etc.
   - For production: `https://yourdomain.com`
9. Add **Authorized redirect URIs**:
   - For local development: `http://localhost:3000/auth/google/callback`
   - For production: `https://yourdomain.com/auth/google/callback`
10. Click **"Create"**
11. **Copy your Client ID** - you'll need this in the next step

### Step 4: Update Your Code

#### Option A: Using Google Identity Services (Recommended - Modern Approach)

1. Open `script.js`
2. Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID from Step 3
3. Uncomment the line in the `DOMContentLoaded` event listener:
   ```javascript
   loadGoogleSignIn();
   ```

4. Update the `googleLoginBtn` click handler to use the new Google Identity Services:
   ```javascript
   googleLoginBtn.addEventListener('click', () => {
       google.accounts.oauth2.initTokenClient({
           client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Client ID
           scope: 'email profile',
           callback: (response) => {
               handleGoogleLogin(response.access_token);
           },
       }).requestAccessToken();
   });
   ```

#### Option B: Using OAuth 2.0 Redirect Flow (Alternative)

If you prefer the redirect flow, update the `googleLoginBtn` click handler:

```javascript
googleLoginBtn.addEventListener('click', () => {
    const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your Client ID
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/google/callback');
    const scope = encodeURIComponent('email profile');
    const responseType = 'code';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    
    window.location.href = googleAuthUrl;
});
```

### Step 5: Set Up Backend (Required for Production)

You'll need a backend server to:
1. Exchange the authorization code for an access token (if using redirect flow)
2. Verify the access token with Google
3. Create or authenticate the user in your system
4. Return a session token to the frontend

#### Example Backend Endpoint (Node.js/Express)

```javascript
// Install required packages: npm install express google-auth-library

const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const app = express();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/api/auth/google', async (req, res) => {
    try {
        const { accessToken } = req.body;
        
        // Verify the token
        const ticket = await client.verifyIdToken({
            idToken: accessToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        const { email, name, picture, sub } = payload;
        
        // Find or create user in your database
        // let user = await User.findOne({ googleId: sub });
        // if (!user) {
        //     user = await User.create({ googleId: sub, email, name, picture });
        // }
        
        // Generate your own session token
        // const sessionToken = generateSessionToken(user);
        
        res.json({
            success: true,
            token: 'your-session-token',
            user: { email, name, picture }
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(401).json({ success: false, error: 'Authentication failed' });
    }
});
```

### Step 6: Test Your Implementation

1. Open `index.html` in a web browser (or serve it via a local server)
2. Click the "Google" login button
3. You should be redirected to Google's login page
4. After logging in, you'll be redirected back to your app
5. Check the browser console for any errors

### Step 7: Security Considerations

1. **Never expose your Client Secret** in frontend code
2. **Always verify tokens** on your backend
3. **Use HTTPS** in production
4. **Validate redirect URIs** to prevent open redirect vulnerabilities
5. **Implement CSRF protection** for OAuth flows
6. **Store sensitive data** (like session tokens) securely

### Troubleshooting

#### "redirect_uri_mismatch" Error
- Ensure your redirect URI in the code matches exactly with what's configured in Google Cloud Console
- Check for trailing slashes and protocol (http vs https)

#### "invalid_client" Error
- Verify your Client ID is correct
- Ensure the OAuth consent screen is properly configured

#### CORS Issues
- Make sure your authorized JavaScript origins include your domain
- For local development, use `http://localhost` with the correct port

#### Token Verification Fails
- Ensure you're using the correct Client ID on the backend
- Check that the token hasn't expired
- Verify the token audience matches your Client ID

## Additional Resources

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 for Web Applications](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Google OAuth Playground](https://developers.google.com/oauthplayground/) - For testing OAuth flows

## Quick Reference

- **Client ID**: Found in Google Cloud Console > APIs & Services > Credentials
- **Authorized Origins**: Your website domains (e.g., `https://yourdomain.com`)
- **Authorized Redirect URIs**: Where Google sends users after authentication
- **Scopes**: `email profile` (for basic user info)

