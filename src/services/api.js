/**
 * API Service — Escola de Produção Musical
 * Conecta o frontend React à API Express/MongoDB no Render.
 * 
 * Em desenvolvimento: usa o servidor local http://localhost:4000
 * Em produção (Vercel): usa a URL do Render via variável de ambiente
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const request = async (method, path, body = null) => {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);

  try {
    const res = await fetch(`${BASE_URL}${path}`, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erro de rede');
    return data;
  } catch (err) {
    console.warn(`[API ${method} ${path}] Fallback para localStorage:`, err.message);
    throw err;
  }
};

// ─── BEATS ────────────────────────────────────────────────────────────────────
export const beatsApi = {
  getAll:   ()          => request('GET',    '/api/beats'),
  create:   (data)      => request('POST',   '/api/beats', data),
  delete:   (id)        => request('DELETE', `/api/beats/${id}`),
  update:   (id, data)  => request('PATCH',  `/api/beats/${id}`, data),
};

// ─── COURSES ──────────────────────────────────────────────────────────────────
export const coursesApi = {
  getAll:        ()                  => request('GET',    '/api/courses'),
  getById:       (id)                => request('GET',    `/api/courses/${id}`),
  create:        (data)              => request('POST',   '/api/courses', data),
  update:        (id, data)          => request('PATCH',  `/api/courses/${id}`, data),
  delete:        (id)                => request('DELETE', `/api/courses/${id}`),
  addModule:     (id, data)          => request('POST',   `/api/courses/${id}/modules`, data),
  addLesson:     (id, modId, data)   => request('POST',   `/api/courses/${id}/modules/${modId}/lessons`, data),
};

// ─── USERS ────────────────────────────────────────────────────────────────────
export const usersApi = {
  getAll:   ()           => request('GET',    '/api/users'),
  create:   (data)       => request('POST',   '/api/users', data),
  update:   (id, data)   => request('PATCH',  `/api/users/${id}`, data),
  delete:   (id)         => request('DELETE', `/api/users/${id}`),
  login:    (data)       => request('POST',   '/api/users/login', data),
};

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
export const paymentsApi = {
  getAll:   (status)     => request('GET',    `/api/payments${status ? `?status=${status}` : ''}`),
  submit:   (data)       => request('POST',   '/api/payments', data),
  approve:  (id)         => request('PATCH',  `/api/payments/${id}/approve`),
  reject:   (id, reason) => request('PATCH',  `/api/payments/${id}/reject`, { reason }),
};

// ─── PLUGINS ──────────────────────────────────────────────────────────────────
export const pluginsApi = {
  getAll:   ()       => request('GET',    '/api/plugins'),
  create:   (data)   => request('POST',   '/api/plugins', data),
  delete:   (id)     => request('DELETE', `/api/plugins/${id}`),
};

// ─── LIVE CLASSES ─────────────────────────────────────────────────────────────
export const liveClassesApi = {
  getAll:   ()           => request('GET',    '/api/live-classes'),
  create:   (data)       => request('POST',   '/api/live-classes', data),
  update:   (id, data)   => request('PATCH',  `/api/live-classes/${id}`, data),
  delete:   (id)         => request('DELETE', `/api/live-classes/${id}`),
};

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────
export const certificatesApi = {
  getAll:   ()     => request('GET',  '/api/certificates'),
  verify:   (code) => request('GET',  `/api/certificates/verify/${code}`),
  create:   (data) => request('POST', '/api/certificates', data),
};

// ─── MASTER REQUESTS ──────────────────────────────────────────────────────────
export const masterRequestsApi = {
  getAll:      ()            => request('GET',   '/api/master-requests'),
  submit:      (data)        => request('POST',  '/api/master-requests', data),
  updateStatus:(id, status)  => request('PATCH', `/api/master-requests/${id}/status`, { status }),
};
