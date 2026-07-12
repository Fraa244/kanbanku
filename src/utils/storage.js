const USERS_KEY = "kanbanku_users";
const SESSION_KEY = "kanbanku_session";
const THEME_KEY = "kanbanku_theme";
const boardKey = (userId) => `kanbanku_board_${userId}`;

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

export function getUsers() {
  return readJSON(USERS_KEY, []);
}

export function saveUsers(users) {
  return writeJSON(USERS_KEY, users);
}

export function getSession() {
  return readJSON(SESSION_KEY, null);
}

export function saveSession(session) {
  return writeJSON(SESSION_KEY, session);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getTheme() {
  return readJSON(THEME_KEY, "light");
}

export function saveTheme(theme) {
  return writeJSON(THEME_KEY, theme);
}

export function getBoard(userId) {
  return readJSON(boardKey(userId), null);
}

export function saveBoard(userId, board) {
  return writeJSON(boardKey(userId), board);
}
