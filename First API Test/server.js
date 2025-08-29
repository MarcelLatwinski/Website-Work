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

// ==== YOUTUBE API ROUTE: Combined stats ====
app.get('/youtube-stats', async (req, res) => {
  try {
    // 1️⃣ Get channel info
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`;
    const channelResponse = await fetch(channelUrl);
    const channelData = await channelResponse.json();
    const channel = channelData.items[0];

    const channelName = channel.snippet.title;
    const subscriberCount = channel.statistics.subscriberCount;
    const totalViews = channel.statistics.viewCount;
    const videoCount = channel.statistics.videoCount;

    // 2️⃣ Get latest video info
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=1&type=video&key=${API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    const latestVideo = searchData.items[0];
    const videoId = latestVideo.id.videoId;
    const videoTitle = latestVideo.snippet.title;

    // 3️⃣ Get latest video stats
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;
    const statsResponse = await fetch(statsUrl);
    const statsData = await statsResponse.json();
    const videoStats = statsData.items[0].statistics;

    const result = {
      channel: {
        channelName,
        subscriberCount,
        totalViews,
        videoCount
      },
      latestVideo: {
        videoId,
        videoTitle,
        viewCount: videoStats.viewCount,
        likeCount: videoStats.likeCount
      }
    };

    // 👇 log it to your Node.js console in pretty JSON format
    //console.log("YouTube stats:", JSON.stringify(result, null, 2));

    res.json(result);
    } catch (error) {
      console.error(error);
      res.json({ error: 'Failed to fetch YouTube stats' });
    }
});


// ==== API ROUTE: Facebook Page followers ====
app.get('/fb-followers', async (req, res) => {
  try {
    const url = `https://graph.facebook.com/v23.0/${process.env.FB_PAGE_ID}?fields=followers_count,fan_count,name&access_token=${process.env.FB_PAGE_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const result = (
       {followersCount: data.followers_count,
        likeCount: data.fan_count,
        FBusername: data.name
     });

    console.log("Facebook stats:", JSON.stringify(result, null, 2));
    res.json(result);

  } catch (error) {
    console.error(error);
    res.json({ error: 'Failed to fetch Facebook followers' });
  }
});

app.get('/ig-followers', async (req, res) => {
  try {
    const url = `https://graph.instagram.com/v23.0/${process.env.IG_USER_ID}?fields=followers_count,username&access_token=${process.env.IG_ACCESS_TOKEN}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const result = (
       {followersCount: data.followers_count,
        likeCount: null,
        IGusername: data.username,
        viewCount: null
     });

    console.log("Instagram stats:", JSON.stringify(result, null, 2));
    res.json(result);

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

    // ✅ Updated URL with open_id and fields
    const url = `https://open.tiktokapis.com/v2/user/info/?open_id=${openId}&fields=follower_count,likes_count,display_name`;
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

    const user = data.data?.user ?? null;
    if (!user) {
      throw new Error('User info not available — make sure the token has user.info.basic and user.info.stats scope');
    }

    res.json({
      username: user.display_name ?? null,
      followersCount: user.follower_count ?? null,
      likesCount: user.likes_count ?? null
    });

  } catch (error) {
    console.error('Error fetching TikTok followers:', error);
    res.json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

