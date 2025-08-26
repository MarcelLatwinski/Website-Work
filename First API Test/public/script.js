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

getFacebookFollowers();
getSubscriberCount();
getLatestVideoStats();

setInterval(getSubscriberCount, 30000);
setInterval(getLatestVideoStats, 30000);
setInterval(getFacebookFollowers, 30000);