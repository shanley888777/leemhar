// Local storage helpers for QR CONCIERGE
const STORAGE_KEY = 'qr_concierge_requests_v1';

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed reading storage', e);
    return [];
  }
}

function writeAll(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('Failed writing storage', e);
  }
}

export function generateId() {
  const random = Math.random().toString(36).slice(2, 8);
  return `req_${Date.now()}_${random}`;
}

export function addRequest(request) {
  const list = readAll();
  list.unshift(request);
  writeAll(list);
  return request;
}

export function getRequests() { return readAll(); }

export function updateRequestStatus(id, status) {
  const list = readAll();
  const idx = list.findIndex(r => r.id === id);
  if (idx !== -1) {
    list[idx].status = status;
    list[idx].updatedAt = Date.now();
    writeAll(list);
    return list[idx];
  }
  return null;
}

export function replaceRequests(nextList) { writeAll(nextList); }

export function clearAllRequests() { writeAll([]); }
