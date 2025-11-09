// Password toggle functionality
const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');

passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Update icon (simple toggle - you can enhance with eye icons)
    passwordToggle.innerHTML = type === 'password' 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>`;
});

// Form submission handler
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Add your login logic here
    console.log('Login attempt:', { email, password });
    
    // Example: You would typically send this to your backend
    // fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Handle response
    // });
});

// Google Login handler
const googleLoginBtn = document.getElementById('googleLogin');

googleLoginBtn.addEventListener('click', () => {
    // Initialize Google Sign-In
    // This requires Google OAuth setup (see README.md for instructions)
    
    // Option 1: Using Google Identity Services (Recommended)
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.oauth2.initTokenClient({
            client_id: '671850001001-qsu7tt1bj9ljnj5jh6t30p2f78jbd2jk.apps.googleusercontent.com',
            scope: 'email profile',
            callback: (response) => {
                // Handle the token response
                console.log('Google login successful:', response);
                // Send token to your backend for verification
                handleGoogleLogin(response.access_token);
            },
        }).requestAccessToken();
    } else {
        // Fallback: Redirect to Google OAuth
        const clientId = '671850001001-qsu7tt1bj9ljnj5jh6t30p2f78jbd2jk.apps.googleusercontent.com';
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/google/callback');
        const scope = encodeURIComponent('email profile');
        const responseType = 'code';
        
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
        
        window.location.href = googleAuthUrl;
    }
});

function handleGoogleLogin(accessToken) {
    // Send the access token to your backend
    fetch('/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store user session/token
            localStorage.setItem('authToken', data.token);
            // Redirect to dashboard or home page
            window.location.href = '/dashboard';
        } else {
            alert('Google login failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during Google login.');
    });
}

// Load Google Identity Services script
function loadGoogleSignIn() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
        console.log('Google Identity Services loaded');
    };
    document.head.appendChild(script);
}

// Load Google script when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Uncomment the line below after setting up your Google Client ID
    // loadGoogleSignIn();
});

