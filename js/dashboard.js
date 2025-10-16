import { $, $all, timeAgo, showToast } from './main.js';
import { getRequests, updateRequestStatus, replaceRequests } from './storage.js';

let state = {
  query: '',
  status: 'all',
  service: 'all',
};

const serviceLabels = {
  housekeeping: 'Housekeeping & Requests',
  fnb: 'Food & Beverages',
  maintenance: 'Maintenance',
  frontdesk: 'Front Desk',
  navigation: 'Navigation',
  feedback: 'Feedback & Forms',
};

function matchesFilters(r) {
  const q = state.query.toLowerCase();
  const hitQuery = !q ||
    r.summary.toLowerCase().includes(q) ||
    String(r.room).toLowerCase().includes(q) ||
    (r.guestName || '').toLowerCase().includes(q);
  const hitStatus = state.status === 'all' || r.status === state.status;
  const hitService = state.service === 'all' || r.serviceType === state.service;
  return hitQuery && hitStatus && hitService;
}

function renderCounts(list) {
  const total = list.length;
  const newCount = list.filter(r => r.status === 'new').length;
  const inProg = list.filter(r => r.status === 'in_progress').length;
  const done = list.filter(r => r.status === 'completed').length;
  const canc = list.filter(r => r.status === 'cancelled').length;
  $('#kpi-total').textContent = String(total);
  $('#kpi-new').textContent = String(newCount);
  $('#kpi-inp').textContent = String(inProg);
  $('#kpi-done').textContent = String(done);
  $('#kpi-canc').textContent = String(canc);
}

function renderTable() {
  const list = getRequests();
  renderCounts(list);
  const filtered = list.filter(matchesFilters);
  const tbody = $('#req-tbody');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="helper">No matching requests.</td></tr>';
    return;
  }
  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td>${timeAgo(r.createdAt)}</td>
      <td>${r.room}</td>
      <td>${r.guestName || 'Guest'}</td>
      <td>${serviceLabels[r.serviceType] || r.serviceType}</td>
      <td>${r.summary}</td>
      <td><span class="status ${r.status}">${r.status.replace('_', ' ')}</span></td>
      <td style="white-space:nowrap">
        <button class="btn ghost" data-act="progress" data-id="${r.id}">In progress</button>
        <button class="btn success" data-act="complete" data-id="${r.id}">Complete</button>
        <button class="btn danger" data-act="cancel" data-id="${r.id}">Cancel</button>
      </td>
    </tr>
  `).join('');
}

function attachEvents() {
  $('#search')?.addEventListener('input', (e) => { state.query = e.target.value; renderTable(); });
  $('#filter-status')?.addEventListener('change', (e) => { state.status = e.target.value; renderTable(); });
  $('#filter-service')?.addEventListener('change', (e) => { state.service = e.target.value; renderTable(); });

  $('#req-tbody')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const act = btn.getAttribute('data-act');
    if (act === 'progress') updateRequestStatus(id, 'in_progress');
    if (act === 'complete') updateRequestStatus(id, 'completed');
    if (act === 'cancel') updateRequestStatus(id, 'cancelled');
    renderTable();
  });

  $('#export')?.addEventListener('click', () => {
    const all = getRequests().filter(matchesFilters);
    if (all.length === 0) { showToast('Nothing to export'); return; }
    const header = ['id','createdAt','updatedAt','property','room','guestName','serviceType','summary','status'];
    const rows = all.map(r => header.map(h => JSON.stringify(r[h] ?? '')).join(','));
    const csv = [header.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr_concierge_requests.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported CSV');
  });

  $('#clear-all')?.addEventListener('click', () => {
    if (!confirm('Clear ALL requests? This cannot be undone.')) return;
    replaceRequests([]);
    renderTable();
  });

  $('#seed-demo')?.addEventListener('click', () => {
    const now = Date.now();
    const sample = [
      { id: `demo_${now}_1`, createdAt: now-600000, updatedAt: now-600000, property: 'Demo Hotel', room: '1205', guestName: 'Alex', serviceType: 'housekeeping', summary: 'Cleaning - Towels', status: 'new' },
      { id: `demo_${now}_2`, createdAt: now-540000, updatedAt: now-540000, property: 'Demo Hotel', room: '804', guestName: 'Sam', serviceType: 'fnb', summary: 'Club Sandwich x2 - No mayo', status: 'new' },
      { id: `demo_${now}_3`, createdAt: now-480000, updatedAt: now-420000, property: 'Demo Hotel', room: '1502', guestName: 'Priya', serviceType: 'maintenance', summary: 'AC - Not cooling', status: 'in_progress' },
      { id: `demo_${now}_4`, createdAt: now-360000, updatedAt: now-300000, property: 'Demo Hotel', room: '305', guestName: 'Diego', serviceType: 'frontdesk', summary: 'Late checkout - 1pm', status: 'completed' },
      { id: `demo_${now}_5`, createdAt: now-240000, updatedAt: now-240000, property: 'Demo Hotel', room: '2207', guestName: 'Mei', serviceType: 'navigation', summary: 'Directions to Spa', status: 'new' },
      { id: `demo_${now}_6`, createdAt: now-180000, updatedAt: now-180000, property: 'Demo Hotel', room: '1110', guestName: 'Jordan', serviceType: 'feedback', summary: 'Rating 5/5 - Great service', status: 'new' },
    ];
    const existing = getRequests();
    replaceRequests([...sample, ...existing]);
    showToast('Seeded demo requests');
    renderTable();
  });
}

function init() {
  attachEvents();
  renderTable();
}

document.addEventListener('DOMContentLoaded', init);
