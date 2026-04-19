const API_BASE_URL = 'http://localhost:5069';
const STATIC_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwcm9kdWN0LWFwaSIsInN1YiI6ImZyb250ZW5kLWNsaWVudCIsImV4cCI6MTgwODEyNjk5OX0.QyjCWKUt-VKEr0FnMCO-G0tcCR_wlKt_eXeZLX7T-ZU';

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

async function request(path, options = {}) {
  const {
    method = 'GET',
    body,
    requiresAuth = true
  } = options;

  const headers = {
    Accept: 'application/json'
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (requiresAuth) {
    headers.Authorization = `Bearer ${STATIC_TOKEN}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const message = typeof data === 'string' && data
      ? data
      : data?.message || 'Request failed';

    throw new Error(message);
  }

  return data;
}

export const apiClient = {
  get: (path, options = {}) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options = {}) => request(path, { ...options, method: 'POST', body })
};
