// ------------------------------------------------------------
// recentlyViewed.js — remembers which paintings you opened.
// The Artwork Details page calls addRecentlyViewed(id); the
// Dashboard and Recently Viewed pages read the list.
// Saved in the browser (localStorage), newest first, max 24.
// Each account has its own history (the key includes the email).
// ------------------------------------------------------------
const MAX = 24;

// The storage key for the signed-in account (or "guest").
function key() {
  let email = 'guest';
  try {
    const user = JSON.parse(localStorage.getItem('artmind-user') || sessionStorage.getItem('artmind-user'));
    if (user) email = user.email;
  } catch {
    // ignore
  }
  return 'artmind-recently-viewed:' + email;
}

// Returns a list like [{ id: 'water-lily-pond', time: 1730000000000 }, ...]
export function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(key())) || [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(id) {
  // Remove the painting if it is already in the list, then put it first.
  const list = getRecentlyViewed().filter((item) => item.id !== id);
  list.unshift({ id, time: Date.now() });
  localStorage.setItem(key(), JSON.stringify(list.slice(0, MAX)));
}

export function clearRecentlyViewed() {
  localStorage.removeItem(key());
}

// Turns a time into friendly text: "Just now", "5 min ago", "2 days ago"…
export function timeAgo(time) {
  const minutes = Math.floor((Date.now() - time) / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}
