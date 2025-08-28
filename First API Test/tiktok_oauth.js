// tiktok-oauth-local.mjs
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fetch from 'node-fetch'; // npm install node-fetch@3

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Replace with your TikTok app's client key & secret
const CLIENT_KEY = 'sbaw5hnfru0e4y47vg';
const CLIENT_SECRET = 'yLUjuvfMZEwwzRgAdHkNkXzsVMXLAkNQ';

// Replace with your LocalTunnel URL + endpoint
const REDIRECT_URI = 'https://gold-peaches-cut.loca.lt/oauth/callback';

// Serve a simple login page
app.get('/', (req, res) => {
    res.send(`
        <h2>Login with TikTok</h2>
        <a href="/oauth">Continue with TikTok</a>
    `);
});

// Step 1: Redirect user to TikTok authorization page
app.get('/oauth', (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);
    res.cookie('csrfState', csrfState, { maxAge: 60000, httpOnly: true });

    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    url += `?client_key=${CLIENT_KEY}`;
    url += `&scope=user.info.basic,user.info.stats`;
    url += `&response_type=code`;
    url += `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    url += `&state=${csrfState}`;

    res.redirect(url);
});

// Step 2: Handle TikTok callback and exchange code for access token
app.get('/oauth/callback', async (req, res) => {
    const { code, state, error, error_description } = req.query;

    const csrfState = req.cookies.csrfState;
    if (!state || state !== csrfState) {
        return res.status(403).send('Invalid state parameter (CSRF check failed)');
    }

    if (error) {
        return res.send(`Error: ${error_description || error}`);
    }

    try {
        // Exchange code for access token (TikTok v2 endpoint)
        const tokenResponse = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_key: CLIENT_KEY,
                client_secret: CLIENT_SECRET,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: REDIRECT_URI
            })
        });

        const tokenData = await tokenResponse.json();
        console.log('Raw TikTok response:', tokenData);

        if (tokenData.error) {
            return res.status(400).send(`TikTok returned an error: ${JSON.stringify(tokenData)}`);
        }

        res.send(`
            <h2>Authorization successful!</h2>
            <p>Access token: ${tokenData.access_token}</p>
            <p>Refresh token: ${tokenData.refresh_token}</p>
            <p>Open ID: ${tokenData.open_id}</p>
            <p>Expires in: ${tokenData.expires_in} seconds</p>
        `);
    } catch (err) {
        console.error('Error fetching TikTok access token:', err);
        res.status(500).send('Failed to fetch TikTok access token');
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open LocalTunnel: npx localtunnel --port ${PORT}`);
});
