import { createContext, useContext, useEffect, useState } from "react";
import { getSession, getUsers, saveSession, saveUsers, clearSession } from "../utils/storage";
import { hashPassword } from "../utils/crypto";
import { generateId } from "../utils/id";

const AuthContext = createContext(null);

function toPublicUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) {
      const users = getUsers();
      const found = users.find((candidate) => candidate.id === session.userId);
      if (found) {
        setUser(toPublicUser(found));
      } else {
        clearSession();
      }
    }
    setLoading(false);
  }, []);

  async function register({ username, email, password, displayName }) {
    const users = getUsers();
    const usernameTaken = users.some(
      (candidate) => candidate.username.toLowerCase() === username.toLowerCase()
    );
    if (usernameTaken) {
      throw new Error("Username sudah digunakan");
    }
    const emailTaken = users.some(
      (candidate) => candidate.email.toLowerCase() === email.toLowerCase()
    );
    if (emailTaken) {
      throw new Error("Email sudah terdaftar");
    }
    const salt = generateId();
    const passwordHash = await hashPassword(password, salt);
    const newUser = {
      id: generateId(),
      username,
      email,
      displayName: displayName || username,
      passwordHash,
      salt,
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    const session = { userId: newUser.id, token: generateId(), createdAt: new Date().toISOString() };
    saveSession(session);
    setUser(toPublicUser(newUser));
    return toPublicUser(newUser);
  }

  async function login({ usernameOrEmail, password }) {
    const users = getUsers();
    const found = users.find(
      (candidate) =>
        candidate.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
        candidate.email.toLowerCase() === usernameOrEmail.toLowerCase()
    );
    if (!found) {
      throw new Error("Akun tidak ditemukan");
    }
    const hash = await hashPassword(password, found.salt);
    if (hash !== found.passwordHash) {
      throw new Error("Password salah");
    }
    const session = { userId: found.id, token: generateId(), createdAt: new Date().toISOString() };
    saveSession(session);
    setUser(toPublicUser(found));
    return toPublicUser(found);
  }

  function logout() {
    clearSession();
    setUser(null);
  }

  const value = { user, loading, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
