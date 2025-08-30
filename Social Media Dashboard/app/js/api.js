// ==== Facebook ====
async function getFacebookFollowers() {
  console.log("getFacebookFollowers() called");
  const response = await fetch('/fb-followers');
  const data = await response.json();
  if (!data.error) {
    document.getElementById("fb-followers").innerHTML = data.followersCount;
    document.getElementById("fb-totallikes").innerHTML = data.likeCount;
    document.getElementById("fb-username").innerHTML = data.FBusername;
  } else {
    console.error(data.error);
  }
}

async function getYouTubeStats() {
  console.log("getYouTubeStats() called");

  try {
    const response = await fetch('/youtube-stats');
    const data = await response.json();

    // 🎯 Update channel stats
    document.getElementById("yt-followers").innerHTML = data.channel.subscriberCount;
    document.getElementById("yt-username").innerText = data.channel.channelName;
    //document.getElementById("yt-totalviews").innerHTML = data.channel.totalViews;
    //document.getElementById("video-count").innerHTML = data.channel.videoCount;

    // 🎯 Update latest video stats
    //document.getElementById("video-title").innerText = data.latestVideo.videoTitle;
    document.getElementById("yt-videoviews").innerHTML = data.latestVideo.viewCount;
    document.getElementById("yt-videolikes").innerHTML = data.latestVideo.likeCount;

    console.log("Latest Video Title:", data.latestVideo.videoTitle);
    console.log("Latest Video Views:", data.latestVideo.viewCount);
    console.log("Latest Video Likes:", data.latestVideo.likeCount);

  } catch (error) {
    console.error("Failed to fetch YouTube stats:", error);
  }
}

async function getInstagramFollowers() {
console.log("getInstagramFollowers() called");
  try {
    const response = await fetch('/ig-followers');
    const data = await response.json();

    if (!data.error) {
      document.getElementById("ig-followers").innerHTML = data.followersCount;
      document.getElementById("ig-username").innerHTML = data.IGusername;
    } else {
      console.error(data.error);
    }
  } catch (err) {
    console.error('Failed to fetch Instagram followers:', err);
  }
}

async function getTikTokFollowers() {
  try {
    const response = await fetch('/tiktok-followers');
    const data = await response.json();

    if (!data.error) {
      document.getElementById("tiktok-followers").innerHTML = data.followersCount;
      document.getElementById("tiktok-username").innerHTML = data.username;
      document.getElementById("tiktok-totalikes").innerHTML = data.likesCount;
    } else {
      console.error(data.error);
    }
  } catch (err) {
    console.error('Failed to fetch TikTok followers:', err);
  }
}

async function updateTotalFollowers() {
  try {
    const fbResponse = await fetch('/fb-followers');
    const ytResponse = await fetch('/youtube-stats');
    const igResponse = await fetch('/ig-followers');
    const ttResponse = await fetch('/tiktok-followers');

    const fbData = await fbResponse.json();
    const ytData = await ytResponse.json();
    const igData = await igResponse.json();
    const ttData = await ttResponse.json();

    // Only sum counts if no error
    const totalFollowers =
      (fbData.error ? 0 : Number(fbData.followersCount)) +
      (ytData.error ? 0 : Number(ytData.channel.subscriberCount)) +
      (igData.error ? 0 : Number(igData.followersCount)) +
      (ttData.error ? 0 : Number(ttData.followersCount));

    document.getElementById("total-followers").innerHTML = totalFollowers;
  } catch (err) {
    console.error("Failed to calculate total followers:", err);
  }
}

getFacebookFollowers();
getYouTubeStats();
getInstagramFollowers();
getTikTokFollowers();
updateTotalFollowers();

setInterval(getYouTubeStats, 30000);
setInterval(getFacebookFollowers, 30000);
setInterval(getInstagramFollowers, 30000);
setInterval(getTikTokFollowers, 30000);
setInterval(updateTotalFollowers, 30000);