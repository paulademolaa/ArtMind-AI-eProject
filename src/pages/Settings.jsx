import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import PasswordInput from '../components/PasswordInput';
import Icon from '../components/Icon';
import UserAvatar from '../components/UserAvatar';
import { categories } from '../data/siteData';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import './Favorites.css';
import './Settings.css';

const tabs = ['Profile', 'Password & security', 'Personalisation', 'Notifications'];

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
  const [toast, setToast] = useState(null);
  const [error, setError] = useState('');

 
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


  const fileInput = useRef(null); 
  const [photoError, setPhotoError] = useState('');

  
  function handlePhoto(event) {
    const file = event.target.files[0];
    event.target.value = ''; 
    if (!file) return;
    if (!file.type.startsWith('image/')) return setPhotoError('Please choose an image file (JPG, PNG or WebP).');
    if (file.size > 5 * 1024 * 1024) return setPhotoError('Please choose an image smaller than 5 MB.');

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const size = 256;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        canvas.getContext('2d').drawImage(img, sx, sy, side, side, 0, 0, size, size);
        const photo = canvas.toDataURL('image/jpeg', 0.85);
        setPhotoError('');
        updateProfile({ photo });
        showToast('Photo updated', 'Your new profile picture has been saved.');
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    updateProfile({ photo: '' });
    showToast('Photo removed', 'Your initials will show instead.');
  }

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
      <h1>Account settiIIIngs</h1>
      <div className="settings-tabs" role="tablist">
        {tabs.map((name) => (
          <button key={name} role="tab" className={tab === name ? 'active' : ''} onClick={() => { setTab(name); setError(''); }}>
            {name}
          </button>
        ))}
      </div>


      {tab === 'Profile' && (
        <div className="settings-profile">
          <div className="settings-photo">
            <UserAvatar user={user} className="settings-avatar" />
            {/* The real file picker is hidden; the button opens it */}
            <input ref={fileInput} type="file" accept="image/*" hidden onChange={handlePhoto} />
            <button className="text-button" type="button" onClick={() => fileInput.current.click()}>
              Change photo
            </button>
            {user.photo && (
              <button className="text-button settings-remove-photo" type="button" onClick={removePhoto}>
                Remove photo
              </button>
            )}
            {photoError && <p className="settings-error settings-photo-error">{photoError}</p>}
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

      {tab === 'Notifications' && (
        <div className="settings-box">
          <h3 className="settings-box-title">Email notifications</h3>
          <Toggle title="Weekly AI picks" text="A short email with new paintings chosen for you." checked={prefs.weeklyPicks} onChange={() => flip('weeklyPicks')} />
          <Toggle title="New collections" text="When our editors publish a new curated collection." checked={prefs.newCollections} onChange={() => flip('newCollections')} />
          <Toggle title="ArtMind news" text="Occasional updates about new features." checked={prefs.news} onChange={() => flip('news')} />
        </div>
      )}

      <div className="settings-actions">
        {error && <p className="settings-error">{error}</p>}
        <button className="btn btn-outline" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-dark" onClick={handleSave}>
          Save changes
        </button>
      </div>

      <div className="settings-box settings-delete-row">
        <div>
          <h3 className="settings-box-title">Delete account</h3>
          <p className="muted small">Permanently removes your favourites, collections and history.</p>
        </div>
        <button className="btn btn-outline" onClick={() => setConfirmDelete(true)}>
          Delete account
        </button>
      </div>

      
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
