// stylesApi.js
// Small client helper to persist per-user UI preferences to the backend.
import { javaURI } from './config.js';

// Use the Java backend (Spring) for styles storage
const API_BASE = `${javaURI}/api/styles`; // backend endpoint base (Spring)

// Optional: read CSRF token from meta tag or cookie if Spring Security active
function getCsrfHeader() {
  // Try meta tag first: <meta name="csrf-token" content="...">
  const m = document.querySelector('meta[name="csrf-token"]');
  if (m && m.content) return { 'X-CSRF-TOKEN': m.content };

  // Fallback: read cookie named XSRF-TOKEN or XSRF-TOKEN (common with CookieCsrfTokenRepository)
  const cookies = document.cookie.split(';').map(c => c.trim());
  for (const c of cookies) {
    if (c.startsWith('XSRF-TOKEN=')) {
      const val = decodeURIComponent(c.split('=')[1]);
      return { 'X-XSRF-TOKEN': val };
    }
    if (c.startsWith('XSRF-TOKEN=')) {
      const val = decodeURIComponent(c.split('=')[1]);
      return { 'X-XSRF-TOKEN': val };
    }
  }
  return {}; // no CSRF header found
}

async function request(url, options = {}) {
  const headers = options.headers || {};
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // attach CSRF header for state-changing requests
  if (['POST','PUT','DELETE','PATCH'].includes((options.method || 'GET').toUpperCase())) {
    Object.assign(headers, getCsrfHeader());
  }

  const res = await fetch(url, { credentials: 'include', ...options, headers });

  let data = null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  return { ok: res.ok, status: res.status, data };
}

export async function getStyle(personId) {
  const url = `${API_BASE}/person/${encodeURIComponent(personId)}`;
  return request(url, { method: 'GET' });
}

export async function createStyle(personId, styleData) {
  const url = `${API_BASE}/person/${encodeURIComponent(personId)}`;
  return request(url, { method: 'POST', body: JSON.stringify(styleData) });
}

export async function updateStyle(personId, styleData) {
  const url = `${API_BASE}/person/${encodeURIComponent(personId)}`;
  return request(url, { method: 'PUT', body: JSON.stringify(styleData) });
}

export async function deleteStyle(personId) {
  const url = `${API_BASE}/person/${encodeURIComponent(personId)}`;
  return request(url, { method: 'DELETE' });
}

export default {
  getStyle,
  createStyle,
  updateStyle,
  deleteStyle
};
