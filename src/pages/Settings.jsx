// ------------------------------------------------------------
// Account Settings — /settings  (matches Figma "Desktop / 14")
// Tabs: Profile · Password & security · Personalisation · Notifications
// "Save changes" saves through AuthContext (in the browser for now)
// and shows a small "Profile updated" message.
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

const tabs = ['Profile', 'Password & security', 'Personalisation', 'Notifications'];

// A simple on/off switch built from a checkbox.
function Toggle({ title, text, checked, onChange }) {
  return (
    <label className="settings-toggle">
      <div>
        <strong>{title}</strong>
        <p className="muted small">{text}</p>
      </div>
      <input type="checkbox" className="switch" checked={checked} onChange={onChange} />
    </label>
  );
}

function Settings() {
  const { user, updateProfile, changePassword, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Profile');
  const [toast, setToast] = useState(null); // { title, text }
  const [error, setError] = useState('');

  // Split the saved name into first and last name for the form.
  const [firstName, ...rest] = user.name.split(' ');
  const [form, setForm] = useState({ firstName, lastName: rest.join(' '), email: user.email });
  const [passwords, setPasswords] = useState({ current: '', next: '' });

  const saved = user.preferences || {};
  const [prefs, setPrefs] = useState({
    personalised: saved.personalised ?? true,
    showWhy: saved.showWhy ?? true,
    communityTrends: saved.communityTrends ?? false,
    interests: saved.interests || [],
    weeklyPicks: saved.weeklyPicks ?? true,
    newCollections: saved.newCollections ?? true,
    news: saved.news ?? false,
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  // The username is made from the email, e.g. "@amara.okafor".
  const username = '@' + user.email.split('@')[0];

  function flip(key) {
    setPrefs({ ...prefs, [key]: !prefs[key] });
  }

  function toggleInterest(name) {
    const list = prefs.interests.includes(name) ? prefs.interests.filter((item) => item !== name) : [...prefs.interests, name];
    setPrefs({ ...prefs, interests: list });
  }

  function showToast(title, text) {
    setToast({ title, text });
    setTimeout(() => setToast(null), 3000);
  }

  // Undo unsaved changes.
  function handleCancel() {
    setForm({ firstName, lastName: rest.join(' '), email: user.email });
    setPasswords({ current: '', next: '' });
    setError('');
  }

  function handleSave() {
    setError('');
    if (tab === 'Password & security') {
      if (passwords.next.length < 8) return setError('Your new password needs at least 8 characters.');
      const problem = changePassword(passwords.current, passwords.next);
      if (problem) return setError(problem);
      setPasswords({ current: '', next: '' });
      return showToast('Password changed', 'Use your new password next time you sign in.');
    }
    const name = `${form.firstName} ${form.lastName}`.trim();
    if (!form.firstName.trim()) return setError('Please enter your first name.');
    if (!form.email.includes('@') || !form.email.includes('.')) return setError('Enter a valid email address.');
    const problem = updateProfile({ name, email: form.email, preferences: prefs });
    if (problem) return setError(problem);
    showToast('Profile updated', 'Your changes have been saved.');
  }

  function handleDelete() {
    deleteAccount();
    navigate('/');
  }

  return (
    <DashboardLayout>
      <h1>Account settings</h1>

      {/* ---- Tabs ---- */}
      <div className="settings-tabs" role="tablist">
        {tabs.map((name) => (
          <button key={name} role="tab" className={tab === name ? 'active' : ''} onClick={() => { setTab(name); setError(''); }}>
            {name}
          </button>
        ))}
      </div>

      {/* ---- Profile ---- */}
      {tab === 'Profile' && (
        <div className="settings-profile">
          <div className="settings-photo">
            <span className="settings-avatar">{initialsOf(`${form.firstName} ${form.lastName}` || user.name)}</span>
            <button className="text-button" type="button">
              Change photo
            </button>
          </div>
          <div className="settings-fields">
            <label className="field">
              First name
              <input value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} />
            </label>
            <label className="field">
              Last name
              <input value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} />
            </label>
            <label className="field settings-wide">
              Email address
              <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            </label>
            <label className="field settings-wide settings-disabled">
              Username (cannot be changed)
              <input value={username} disabled />
            </label>
          </div>
        </div>
      )}

      {/* ---- Password & security ---- */}
      {tab === 'Password & security' && (
        <div className="settings-box">
          <h3 className="settings-box-title">Change password</h3>
          <div className="field">
            Current password
            <PasswordInput value={passwords.current} onChange={(event) => setPasswords({ ...passwords, current: event.target.value })} />
          </div>
          <div className="field">
            New password (at least 8 characters)
            <PasswordInput value={passwords.next} onChange={(event) => setPasswords({ ...passwords, next: event.target.value })} />
          </div>
        </div>
      )}

      {/* ---- Personalisation & privacy (shown on Profile and Personalisation tabs, as in Figma) ---- */}
      {(tab === 'Profile' || tab === 'Personalisation') && (
        <div className="settings-box">
          <h3 className="settings-box-title">Personalisation &amp; privacy</h3>
          <Toggle title="Personalised recommendations" text="Use my views and saves to tailor suggestions" checked={prefs.personalised} onChange={() => flip('personalised')} />
          <Toggle title="Show why something was recommended" text="Display reasons like “Because you explored abstract art”" checked={prefs.showWhy} onChange={() => flip('showWhy')} />
          <Toggle title="Include me in community trends" text="Anonymous, aggregated data only" checked={prefs.communityTrends} onChange={() => flip('communityTrends')} />
          {tab === 'Personalisation' && (
            <>
              <p className="settings-label">Favourite categories</p>
              <div className="settings-chips">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    className={prefs.interests.includes(category.name) ? 'chip active' : 'chip'}
                    onClick={() => toggleInterest(category.name)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </>
          )}
          <button type="button" className="text-button settings-reset" onClick={() => setPrefs({ ...prefs, interests: [] })}>
            <Icon name="refresh" size={14} /> Reset my taste profile
          </button>
        </div>
      )}

      {/* ---- Notifications ---- */}
      {tab === 'Notifications' && (
        <div className="settings-box">
          <h3 className="settings-box-title">Email notifications</h3>
          <Toggle title="Weekly AI picks" text="A short email with new paintings chosen for you." checked={prefs.weeklyPicks} onChange={() => flip('weeklyPicks')} />
          <Toggle title="New collections" text="When our editors publish a new curated collection." checked={prefs.newCollections} onChange={() => flip('newCollections')} />
          <Toggle title="ArtMind news" text="Occasional updates about new features." checked={prefs.news} onChange={() => flip('news')} />
        </div>
      )}

      {/* ---- Save / Cancel ---- */}
      <div className="settings-actions">
        {error && <p className="settings-error">{error}</p>}
        <button className="btn btn-outline" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-dark" onClick={handleSave}>
          Save changes
        </button>
      </div>

      {/* ---- Delete account ---- */}
      <div className="settings-box settings-delete-row">
        <div>
          <h3 className="settings-box-title">Delete account</h3>
          <p className="muted small">Permanently removes your favourites, collections and history.</p>
        </div>
        <button className="btn btn-outline" onClick={() => setConfirmDelete(true)}>
          Delete account
        </button>
      </div>

      {/* ---- "Profile updated" message ---- */}
      {toast && (
        <div className="settings-toast" role="status">
          <Icon name="check" size={16} />
          <div>
            <strong>{toast.title}</strong>
            <p>{toast.text}</p>
          </div>
          <button onClick={() => setToast(null)} aria-label="Close">
            <Icon name="close" size={14} />
          </button>
        </div>
      )}

      {/* ---- Delete confirmation ---- */}
      {confirmDelete && (
        <div className="modal-backdrop" onClick={() => setConfirmDelete(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <h3>Delete your account?</h3>
            <p className="muted">You will be signed out and your account details will be removed. This can’t be undone.</p>
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
