const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email.trim());
}

export function isValidUsername(username) {
  return USERNAME_REGEX.test(username.trim());
}
