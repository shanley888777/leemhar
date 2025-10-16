import { $, $all, showToast, getQueryParam } from './main.js';
import { addRequest, generateId, getRequests } from './storage.js';

const services = {
  housekeeping: 'Housekeeping & Requests',
  fnb: 'Food & Beverages',
  maintenance: 'Maintenance',
  frontdesk: 'Front Desk',
  navigation: 'Navigation',
  feedback: 'Feedback & Forms',
};

function getContext() {
  return {
    property: getQueryParam('property') || 'Your Hotel',
    room: getQueryParam('room') || '',
    guestName: getQueryParam('guest') || '',
  };
}

function fillContext() {
  const ctx = getContext();
  const els = $all('[data-property]');
  els.forEach(el => el.textContent = ctx.property);
  const roomInputEls = $all('input[name="room"]');
  roomInputEls.forEach(el => { if (!el.value) el.value = ctx.room; });
}

function summarizePayload(serviceType, payload) {
  switch (serviceType) {
    case 'housekeeping':
      return `${payload.requestType} - ${payload.notes || ''}`.trim();
    case 'fnb':
      return `${payload.item} x${payload.quantity} - ${payload.notes || ''}`.trim();
    case 'maintenance':
      return `${payload.issueType} - ${payload.notes || ''}`.trim();
    case 'frontdesk':
      return `${payload.requestType} - ${payload.notes || ''}`.trim();
    case 'navigation':
      return `Directions to ${payload.destination}`;
    case 'feedback':
      return `Rating ${payload.rating}/5 - ${payload.message?.slice(0,60) || ''}`;
    default:
      return 'Request';
  }
}

function submitForm(serviceType, payload) {
  const ctx = getContext();
  const request = {
    id: generateId(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    property: ctx.property,
    room: payload.room || ctx.room || 'N/A',
    guestName: payload.guestName || ctx.guestName || 'Guest',
    serviceType,
    serviceLabel: services[serviceType] || serviceType,
    payload,
    summary: summarizePayload(serviceType, payload),
    status: 'new',
  };
  addRequest(request);
  showToast('Request submitted');
  renderMyRequests();
}

function handleForms() {
  // Housekeeping
  $('#hk-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      room: form.room.value.trim(),
      guestName: form.guestName.value.trim(),
      requestType: form.requestType.value,
      notes: form.notes.value.trim(),
    };
    submitForm('housekeeping', payload);
    form.reset();
  });

  // Food & Beverages
  $('#fnb-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      room: form.room.value.trim(),
      guestName: form.guestName.value.trim(),
      item: form.item.value.trim(),
      quantity: Number(form.quantity.value || 1),
      notes: form.notes.value.trim(),
    };
    submitForm('fnb', payload);
    form.reset();
  });

  // Maintenance
  $('#mnt-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      room: form.room.value.trim(),
      guestName: form.guestName.value.trim(),
      issueType: form.issueType.value,
      notes: form.notes.value.trim(),
    };
    submitForm('maintenance', payload);
    form.reset();
  });

  // Front Desk
  $('#fd-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      room: form.room.value.trim(),
      guestName: form.guestName.value.trim(),
      requestType: form.requestType.value,
      notes: form.notes.value.trim(),
    };
    submitForm('frontdesk', payload);
    form.reset();
  });

  // Navigation
  $('#nav-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      room: form.room.value.trim(),
      guestName: form.guestName.value.trim(),
      destination: form.destination.value,
    };
    submitForm('navigation', payload);
    form.reset();
  });

  // Feedback
  $('#fb-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      room: form.room.value.trim(),
      guestName: form.guestName.value.trim(),
      rating: Number(form.rating.value || 5),
      message: form.message.value.trim(),
    };
    submitForm('feedback', payload);
    form.reset();
  });
}

function renderMyRequests() {
  const ctx = getContext();
  const list = getRequests().filter(r => !ctx.room || r.room === ctx.room);
  const container = $('#my-requests');
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = '<p class="helper">No requests yet.</p>';
    return;
  }
  container.innerHTML = list.map(r => `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div>
          <div class="badge">${r.serviceLabel}</div>
          <h4 style="margin:8px 0 4px">${r.summary}</h4>
          <div class="helper">Room ${r.room} • ${new Date(r.createdAt).toLocaleString()}</div>
        </div>
        <span class="status ${r.status}">${r.status.replace('_', ' ')}</span>
      </div>
    </div>
  `).join('');
}

function init() {
  fillContext();
  handleForms();
  renderMyRequests();
}

document.addEventListener('DOMContentLoaded', init);
