// ==== Facebook ====
async function getFacebookFollowers() {
  const response = await fetch('/fb-followers');
  const data = await response.json();
  if (!data.error) {
    document.getElementById("fb-counter").innerHTML = data.followersCount;
  } else {
    console.error(data.error);
  }
}

async function getSubscriberCount() {
  const response = await fetch('/subscribers');
  const data = await response.json();
  document.getElementById("counter").innerHTML = data.subscriberCount;
}

async function getLatestVideoStats() {
  const response = await fetch('/latest-video');
  const data = await response.json();
  document.getElementById("video-title").innerText = data.videoTitle;
  document.getElementById("video-views").innerHTML = data.viewCount;
  document.getElementById("video-likes").innerHTML = data.likeCount;
}

async function getInstagramFollowers() {
  try {
    const response = await fetch('/ig-followers');
    const data = await response.json();

    if (!data.error) {
      document.getElementById("ig-counter").innerHTML = data.followersCount;
    } else {
      console.error(data.error);
    }
  } catch (err) {
    console.error('Failed to fetch Instagram followers:', err);
  }
}



getFacebookFollowers();
getSubscriberCount();
getLatestVideoStats();
getInstagramFollowers();

setInterval(getSubscriberCount, 30000);
setInterval(getLatestVideoStats, 30000);
setInterval(getFacebookFollowers, 30000);
setInterval(getInstagramFollowers, 30000);
