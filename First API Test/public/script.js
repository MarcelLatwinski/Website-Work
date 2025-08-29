// ==== Facebook ====
async function getFacebookFollowers() {
  console.log("getFacebookFollowers() called");
  const response = await fetch('/fb-followers');
  const data = await response.json();
  if (!data.error) {
    document.getElementById("fb-followers").innerHTML = data.followersCount;
    document.getElementById("fb-likes").innerHTML = data.likeCount;
    document.getElementById("fb-name").innerHTML = data.FBusername;
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
    document.getElementById("counter").innerHTML = data.channel.subscriberCount;
    document.getElementById("channel-name").innerText = data.channel.channelName;
    document.getElementById("total-views").innerHTML = data.channel.totalViews;
    document.getElementById("video-count").innerHTML = data.channel.videoCount;

    // 🎯 Update latest video stats
    document.getElementById("video-title").innerText = data.latestVideo.videoTitle;
    document.getElementById("video-views").innerHTML = data.latestVideo.viewCount;
    document.getElementById("video-likes").innerHTML = data.latestVideo.likeCount;

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
      document.getElementById("ig-counter").innerHTML = data.followersCount;
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
      document.getElementById("tiktok-likesCount").innerHTML = data.likesCount;
    } else {
      console.error(data.error);
    }
  } catch (err) {
    console.error('Failed to fetch TikTok followers:', err);
  }
}

getFacebookFollowers();
getYouTubeStats();
getInstagramFollowers();
getTikTokFollowers();

setInterval(getYouTubeStats, 30000);
setInterval(getFacebookFollowers, 30000);
setInterval(getInstagramFollowers, 30000);
setInterval(getTikTokFollowers, 30000);
