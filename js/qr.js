import { $, showToast } from './main.js';

function defaultGuestUrl() {
  try {
    const loc = new URL(window.location.href);
    const basePath = loc.pathname.replace(/qr\.html$/, 'guest.html');
    return `${loc.origin}${basePath}`;
  } catch {
    return 'guest.html';
  }
}

let qr;

function ensureQRiousLoaded() {
  if (window.QRious) return true;
  alert('QRious library not loaded. Check network connection.');
  return false;
}

function buildUrl() {
  const base = $('#base-url').value.trim() || defaultGuestUrl();
  const property = encodeURIComponent($('#property').value.trim() || 'Your Hotel');
  const room = encodeURIComponent($('#room').value.trim());
  const guest = encodeURIComponent($('#guest').value.trim());
  const url = new URL(base, window.location.href);
  url.searchParams.set('property', decodeURIComponent(property));
  if (room) url.searchParams.set('room', decodeURIComponent(room));
  if (guest) url.searchParams.set('guest', decodeURIComponent(guest));
  return url.toString();
}

function renderQR() {
  if (!ensureQRiousLoaded()) return;
  const text = buildUrl();
  $('#link-preview').textContent = text;
  if (!qr) {
    qr = new QRious({ element: $('#qr-canvas'), value: text, size: 256, level: 'H' });
  } else {
    qr.value = text;
  }
}

function downloadPNG() {
  const canvas = $('#qr-canvas');
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'qr_concierge.png';
  a.click();
}

function init() {
  $('#base-url').value = defaultGuestUrl();
  ['property','room','guest','base-url'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', renderQR);
  });
  $('#download')?.addEventListener('click', downloadPNG);
  renderQR();
}

document.addEventListener('DOMContentLoaded', init);
