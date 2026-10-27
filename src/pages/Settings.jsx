// ------------------------------------------------------------
// Account Settings — /settings
// 1. Profile (name + email)   2. Password
// 3. Preferences (interests + emails)   4. Delete account
// Changes are saved through AuthContext (in the browser for now).
// ------------------------------------------------------------
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import PasswordInput from '../components/PasswordInput';
import Icon from '../components/Icon';
import { categories } from '../data/siteData';
import { useAuth, initialsOf } from '../context/AuthContext';
import './Dashboard.css';
import './Favorites.css';
import './Settings.css';

function Settings() {
  const { user, updateProfile, changePassword, deleteAccount } = useAuth();
  const navigate = useNavigate();

  // ---- 1. Profile ----
  const [profile, setProfile] = useState({ name: user.name, email: user.email });
  const [profileMessage, setProfileMessage] = useState({ text: '', error: false });

  function saveProfile(event) {
    event.preventDefault();
    if (!profile.name.trim()) return setProfileMessage({ text: 'Please enter your name.', error: true });
    if (!profile.email.includes('@') || !profile.email.includes('.')) {
      return setProfileMessage({ text: 'Enter a valid email address.', error: true });
    }
    const problem = updateProfile({ name: profile.name.trim(), email: profile.email });
    setProfileMessage(problem ? { text: problem, error: true } : { text: 'Profile saved.', error: false });
  }

  // ---- 2. Password ----
  const [passwords, setPasswords] = useState({ current: '', next: '' });
  const [passwordMessage, setPasswordMessage] = useState({ text: '', error: false });

  function savePassword(event) {
    event.preventDefault();
    if (passwords.next.length < 8) {
      return setPasswordMessage({ text: 'Your new password needs at least 8 characters.', error: true });
    }
    const problem = changePassword(passwords.current, passwords.next);
    if (problem) {
      setPasswordMessage({ text: problem, error: true });
    } else {
      setPasswordMessage({ text: 'Password changed.', error: false });
      setPasswords({ current: '', next: '' });
    }
  }

  // ---- 3. Preferences ----
  const saved = user.preferences || {};
  const [interests, setInterests] = useState(saved.interests || []);
  const [emails, setEmails] = useState({
    weeklyPicks: saved.weeklyPicks ?? true,
    newCollections: saved.newCollections ?? true,
    news: saved.news ?? false,
  });
  const [preferencesMessage, setPreferencesMessage] = useState('');

  function toggleInterest(name) {
    setInterests(interests.includes(name) ? interests.filter((item) => item !== name) : [...interests, name]);
  }

  function savePreferences() {
    updateProfile({ preferences: { interests, ...emails } });
    setPreferencesMessage('Preferences saved.');
  }

  // ---- 4. Delete account ----
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleDelete() {
    deleteAccount();
    navigate('/');
  }

  const emailOptions = [
    ['weeklyPicks', 'Weekly AI picks', 'A short email with new paintings chosen for you.'],
    ['newCollections', 'New collections', 'When our editors publish a new curated collection.'],
    ['news', 'ArtMind news', 'Occasional updates about new features.'],
  ];

  return (
    <DashboardLayout>
      <div className="welcome">
        <div>
          <h1>Account settings</h1>
          <p className="muted">Manage your profile, password and preferences.</p>
        </div>
      </div>

      {/* ---------- 1. PROFILE ---------- */}
      <section className="settings-card">
        <div className="settings-intro">
          <h3>Profile</h3>
          <p className="muted small">This is how your name appears across ArtMind.</p>
        </div>
        <form onSubmit={saveProfile} className="settings-form" noValidate>
          <div className="settings-avatar">
            <span className="user-avatar">{initialsOf(profile.name || user.name)}</span>
            <p className="muted small">Member since {user.joined}</p>
          </div>
          <label className="field">
            Full name
            <input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />
          </label>
          <label className="field">
            Email address
            <input type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} />
          </label>
          <div className="settings-actions">
            {profileMessage.text && <p className={profileMessage.error ? 'settings-error' : 'settings-success'}>{profileMessage.text}</p>}
            <button type="submit" className="btn btn-dark">
              Save profile
            </button>
          </div>
        </form>
      </section>

      {/* ---------- 2. PASSWORD ---------- */}
      <section className="settings-card">
        <div className="settings-intro">
          <h3>Password</h3>
          <p className="muted small">Use at least 8 characters.</p>
        </div>
        <form onSubmit={savePassword} className="settings-form" noValidate>
          <div className="field">
            Current password
            <PasswordInput value={passwords.current} onChange={(event) => setPasswords({ ...passwords, current: event.target.value })} />
          </div>
          <div className="field">
            New password
            <PasswordInput value={passwords.next} onChange={(event) => setPasswords({ ...passwords, next: event.target.value })} />
          </div>
          <div className="settings-actions">
            {passwordMessage.text && <p className={passwordMessage.error ? 'settings-error' : 'settings-success'}>{passwordMessage.text}</p>}
            <button type="submit" className="btn btn-dark">
              Change password
            </button>
          </div>
        </form>
      </section>

      {/* ---------- 3. PREFERENCES ---------- */}
      <section className="settings-card">
        <div className="settings-intro">
          <h3>Preferences</h3>
          <p className="muted small">Helps ArtMind pick paintings for you.</p>
        </div>
        <div className="settings-form">
          <p className="settings-label">Favourite categories</p>
          <div className="settings-chips">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                className={interests.includes(category.name) ? 'chip active' : 'chip'}
                onClick={() => toggleInterest(category.name)}
              >
                {interests.includes(category.name) && <Icon name="check" size={14} />} {category.name}
              </button>
            ))}
          </div>

          <p className="settings-label">Emails</p>
          {emailOptions.map(([key, title, text]) => (
            <label key={key} className="settings-toggle">
              <div>
                <strong>{title}</strong>
                <p className="muted small">{text}</p>
              </div>
              <input type="checkbox" checked={emails[key]} onChange={() => setEmails({ ...emails, [key]: !emails[key] })} />
            </label>
          ))}

          <div className="settings-actions">
            {preferencesMessage && <p className="settings-success">{preferencesMessage}</p>}
            <button type="button" className="btn btn-dark" onClick={savePreferences}>
              Save preferences
            </button>
          </div>
        </div>
      </section>

      {/* ---------- 4. DELETE ACCOUNT ---------- */}
      <section className="settings-card settings-danger">
        <div className="settings-intro">
          <h3>Delete account</h3>
          <p className="muted small">This removes your account from this browser. It can’t be undone.</p>
        </div>
        <div className="settings-form">
          <button type="button" className="btn btn-outline settings-delete" onClick={() => setConfirmDelete(true)}>
            <Icon name="trash" size={16} /> Delete my account
          </button>
        </div>
      </section>

      {/* Confirmation pop-up */}
      {confirmDelete && (
        <div className="modal-backdrop" onClick={() => setConfirmDelete(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <h3>Delete your account?</h3>
            <p className="muted">You will be signed out and your account details will be removed.</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setConfirmDelete(false)}>
                Keep my account
              </button>
              <button className="btn btn-dark" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Settings;
