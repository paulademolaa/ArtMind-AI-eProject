// ------------------------------------------------------------
// AuthContext — remembers who is signed in, for every page.
//
// There is no real server yet, so accounts are saved in the browser
// (localStorage). This is for learning/demo only: a real website
// must check passwords on a server and never store them like this.
//
// Usage in any component:
//   const { user, signUp, signIn, signOut } = useAuth();
//   user is null for visitors, or { name, email, joined } when signed in.
// ------------------------------------------------------------
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Small helpers to read and save JSON in localStorage.
function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function AuthProvider({ children }) {
  // Start with whoever was signed in last time (or nobody).
  const [user, setUser] = useState(() => load('artmind-user', null));

  function startSession(account) {
    const signedIn = { name: account.name, email: account.email, joined: account.joined };
    setUser(signedIn);
    save('artmind-user', signedIn);
  }

  // Create an account. Returns an error message, or '' if it worked.
  function signUp(name, email, password) {
    const accounts = load('artmind-accounts', []);
    const cleanEmail = email.trim().toLowerCase();
    if (accounts.some((account) => account.email === cleanEmail)) {
      return 'An account with this email already exists. Try signing in.';
    }
    const account = { name: name.trim(), email: cleanEmail, password, joined: new Date().getFullYear() };
    save('artmind-accounts', [...accounts, account]);
    startSession(account);
    return '';
  }

  // Sign in to an existing account. Returns an error message, or ''.
  function signIn(email, password) {
    const accounts = load('artmind-accounts', []);
    const account = accounts.find((item) => item.email === email.trim().toLowerCase());
    if (!account) return 'No account found with this email. Please sign up first.';
    if (account.password !== password) return 'That password is not correct.';
    startSession(account);
    return '';
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('artmind-user');
  }

  return <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
}

// The hook pages use to read the signed-in user.
export function useAuth() {
  return useContext(AuthContext);
}

// "Paul Ademola" -> "PA" (used for the round profile picture)
export function initialsOf(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// "Paul Ademola" -> "Paul"
export function firstNameOf(name) {
  return name.trim().split(' ')[0];
}
