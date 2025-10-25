require('dotenv').config();

const ACCESS_TOKEN = process.env.GOREST_TOKEN;

if (!ACCESS_TOKEN) {
  throw new Error('Variável de ambiente GOREST_TOKEN não foi encontrada.');
}

function apiClient(request) {
  const authHeader = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  return {
    get: (path, opts = {}) =>
      request.get(path, {
        headers: { ...authHeader, ...(opts.headers || {}) },
        ...opts,
      }),

    post: (path, data, opts = {}) =>
      request.post(path, {
        data,
        headers: { ...authHeader, ...(opts.headers || {}) },
        ...opts,
      }),

    put: (path, data, opts = {}) =>
      request.put(path, {
        data,
        headers: { ...authHeader, ...(opts.headers || {}) },
        ...opts,
      }),

    delete: (path, opts = {}) =>
      request.delete(path, {
        headers: { ...authHeader, ...(opts.headers || {}) },
        ...opts,
      }),
  };
}

module.exports = { apiClient, ACCESS_TOKEN };
