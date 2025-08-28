// server.js
import express from 'express'; //Express framework - handles http requests and builds a server
import dotenv from 'dotenv'; //Dotenv library - lets me load enviroment variables from a .env file 

dotenv.config(); // reads .env file - can access each variable now via process.env.VARIABLE_NAME

const app = express(); // Creates app object - handles server: routing, middleware, serving static files
const PORT = 3000; //Sets the port the server will listen on 

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCIIcUq-DNRXGoADi8slTSyg'; 

// Serve static files in "public" folder
app.use(express.static('public')); //static files (HTML, CSS, JS) from public folder will be returned when visiting http://localhost:3000/index.html

// ==== API ROUTE: Subscriber count ====
app.get('/subscribers', async (req, res) => { //Defines a GET route at /subscribers to use at the front end. async allows us to use await for async operations like fetching
  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const subscriberCount = data.items[0].statistics.subscriberCount;
    res.json({ subscriberCount });
  } catch (error) {
    console.error(error);
    res.json({ error: 'Failed to fetch subscriber count' });
  }
});

// ==== API ROUTE: Latest video stats ====
app.get('/latest-video', async (req, res) => {
  try {
    // 1️⃣ Get latest video
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=1&type=video&key=${API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    const video = searchData.items[0];
    const videoId = video.id.videoId;
    const videoTitle = video.snippet.title;

    // 2️⃣ Get video stats
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;
    const statsResponse = await fetch(statsUrl);
    const statsData = await statsResponse.json();
    const stats = statsData.items[0].statistics;

    res.json({
      videoTitle,
      viewCount: stats.viewCount,
      likeCount: stats.likeCount
    });
  } catch (error) {
    console.error(error);
    res.json({ error: 'Failed to fetch latest video stats' });
  }
});

// ==== API ROUTE: Facebook Page followers ====
app.get('/fb-followers', async (req, res) => {
  try {
    const url = `https://graph.facebook.com/v23.0/${process.env.FB_PAGE_ID}?fields=followers_count&access_token=${process.env.FB_PAGE_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    res.json({ followersCount: data.followers_count });
  } catch (error) {
    console.error(error);
    res.json({ error: 'Failed to fetch Facebook followers' });
  }
});

app.get('/ig-followers', async (req, res) => {
  try {
    const url = `https://graph.instagram.com/v23.0/${process.env.IG_USER_ID}?fields=followers_count&access_token=${process.env.IG_ACCESS_TOKEN}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    res.json({ followersCount: data.followers_count });
  } catch (error) {
    console.error(error);
    res.json({ error: 'Failed to fetch Instagram followers' });
  }
});

// ==== API ROUTE: TikTok followers ====
app.get('/tiktok-followers', async (req, res) => {
  try {
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
    const openId = process.env.TIKTOK_OPENID;

    if (!accessToken || !openId) {
      throw new Error('Missing TikTok access token or OpenID');
    }

    // Make request to TikTok API with proper scope
    const url = `https://open.tiktokapis.com/v2/user/info/?open_id=${openId}&fields=follower_count`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('TikTok API response:', data);

    if (data.error && data.error.code !== 'ok') {
      throw new Error(data.error.message || 'TikTok API returned an error');
    }

    const followersCount = data.data?.user?.follower_count ?? null;
    if (followersCount === null) {
      throw new Error('Follower count not available — make sure the token has user.info.stats scope');
    }

    res.json({ followersCount });

  } catch (error) {
    console.error('Error fetching TikTok followers:', error);
    res.json({ error: error.message });
  }
});


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

