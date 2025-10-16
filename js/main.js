// Minimal global helpers for QR CONCIERGE
export function $(selector, scope = document) { return scope.querySelector(selector); }
export function $all(selector, scope = document) { return Array.from(scope.querySelectorAll(selector)); }

export function formatDateTime(ts) {
  try { return new Date(ts).toLocaleString(); } catch { return String(ts); }
}

export function timeAgo(ts) {
  const diffMs = Date.now() - ts;
  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (day > 0) return `${day}d ago`;
  if (hr > 0) return `${hr}h ago`;
  if (min > 0) return `${min}m ago`;
  return `${sec}s ago`;
}

export function showToast(message) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => el.classList.remove('show'), 2500);
}

export function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
