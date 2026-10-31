import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('ArtMind could not save to the browser:', error);
  }
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem('artmind-user') || sessionStorage.getItem('artmind-user')) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);
  const [remember, setRemember] = useState(() => !sessionStorage.getItem('artmind-user'));

  function startSession(account, keep = remember) {
    const signedIn = {
      name: account.name,
      email: account.email,
      joined: account.joined,
      photo: account.photo || '', // profile picture (a small image saved as text)
      preferences: account.preferences || {},
    };
    setUser(signedIn);
    setRemember(keep);
    if (keep) {
      save('artmind-user', signedIn);
      sessionStorage.removeItem('artmind-user');
    } else {
      sessionStorage.setItem('artmind-user', JSON.stringify(signedIn));
      localStorage.removeItem('artmind-user');
    }
  }

  function signUp(name, email, password) {
    const accounts = load('artmind-accounts', []);
    const cleanEmail = email.trim().toLowerCase();
    if (accounts.some((account) => account.email === cleanEmail)) {
      return 'An account with this email already exists. Try signing in.';
    }
    const account = { name: name.trim(), email: cleanEmail, password, joined: new Date().getFullYear() };
    save('artmind-accounts', [...accounts, account]);
    startSession(account, true); // new accounts stay signed in
    return '';
  }

  function signIn(email, password, keepSignedIn = true) {
    const accounts = load('artmind-accounts', []);
    const account = accounts.find((item) => item.email === email.trim().toLowerCase());
    if (!account) return 'No account found with this email. Please sign up first.';
    if (account.password !== password) return 'That password is not correct.';
    startSession(account, keepSignedIn);
    return '';
  }

  function updateProfile(changes) {
    let accounts = load('artmind-accounts', []);
    if (!accounts.some((account) => account.email === user.email)) {
      accounts = [...accounts, { ...user }];
    }
    const newEmail = (changes.email || user.email).trim().toLowerCase();
    if (newEmail !== user.email && accounts.some((account) => account.email === newEmail)) {
      return 'Another account already uses this email.';
    }
    const updated = accounts.map((account) =>
      account.email === user.email ? { ...account, ...changes, email: newEmail } : account
    );
    save('artmind-accounts', updated);
    startSession(updated.find((account) => account.email === newEmail));
    return '';
  }

  function changePassword(currentPassword, newPassword) {
    const accounts = load('artmind-accounts', []);
    const account = accounts.find((item) => item.email === user.email);
    if (!account || account.password !== currentPassword) return 'Your current password is not correct.';
    save('artmind-accounts', accounts.map((item) => (item === account ? { ...item, password: newPassword } : item)));
    return '';
  }

  function resetPassword(email, newPassword) {
    const accounts = load('artmind-accounts', []);
    const cleanEmail = email.trim().toLowerCase();
    if (!accounts.some((account) => account.email === cleanEmail)) return 'No account found with this email.';
    save('artmind-accounts', accounts.map((account) => (account.email === cleanEmail ? { ...account, password: newPassword } : account)));
    return '';
  }

  function deleteAccount() {
    const accounts = load('artmind-accounts', []);
    save('artmind-accounts', accounts.filter((account) => account.email !== user.email));
    signOut();
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('artmind-user');
    sessionStorage.removeItem('artmind-user');
  }

  return <AuthContext.Provider value={{ user, signUp, signIn, signOut, updateProfile, changePassword, deleteAccount, resetPassword }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function initialsOf(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function firstNameOf(name) {
  return name.trim().split(' ')[0];
}
