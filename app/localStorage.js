export function get (key) {
  let value = window.localStorage.getItem(key);
  return value && JSON.parse(value);
}

export function put (key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}

export function updateAuth (accessToken, refreshToken, role) {
  let auth = get('auth');
  /* eslint-disable camelcase */
  auth.refresh_token = refreshToken;
  auth.access_token = accessToken;
  auth.role = role;
  /* eslint-enable camelcase */
  put('auth', auth);
}

export function clear () {
  window.localStorage.clear();
}
