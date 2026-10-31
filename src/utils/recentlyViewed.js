const MAX = 24;

function key() {
  let email = 'guest';
  try {
    const user = JSON.parse(localStorage.getItem('artmind-user') || sessionStorage.getItem('artmind-user'));
    if (user) email = user.email;
  } catch {
  }
  return 'artmind-recently-viewed:' + email;
}

export function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(key())) || [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(id) {
  const list = getRecentlyViewed().filter((item) => item.id !== id);
  list.unshift({ id, time: Date.now() });
  localStorage.setItem(key(), JSON.stringify(list.slice(0, MAX)));
}

export function clearRecentlyViewed() {
  localStorage.removeItem(key());
}

export function timeAgo(time) {
  const minutes = Math.floor((Date.now() - time) / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}
