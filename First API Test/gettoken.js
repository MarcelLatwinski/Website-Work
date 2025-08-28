app.get('/auth/tiktok/callback', async (req, res) => {
  const { code, state } = req.query;

  if (!code) return res.send('No code received');

  // We'll exchange this code for an access token next
  try {
    const params = new URLSearchParams({
      client_key: process.env.TIKTOK_USER_KEY,
      client_secret: process.env.TIKTOK_USER_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: 'https://sweet-ears-nail.loca.lt/auth/tiktok/callback'
    });

    const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    const data = await response.json();

    // This contains your access token and refresh token
    console.log(data);

    res.send(`Access token received! Check console for details.`);
  } catch (err) {
    console.error(err);
    res.send('Error fetching access token');
  }
});
