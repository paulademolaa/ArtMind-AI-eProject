// ------------------------------------------------------------
// DashboardLayout — the signed-in area: a sidebar on the left and
// the page content on the right. Used by Dashboard, Favorites,
// Collections, Recently Viewed and Account Settings.
// ------------------------------------------------------------
import { Link, NavLink } from 'react-router-dom';
import PageLayout from './PageLayout';
import Icon from './Icon';
import UserAvatar from './UserAvatar';
import { useAuth } from '../context/AuthContext';
import './DashboardLayout.css';

const menu = [
  { to: '/dashboard', label: 'Overview', icon: 'home' },
  { to: '/favorites', label: 'Favorites', icon: 'heart' },
  { to: '/collections', label: 'Collections', icon: 'layers' },
  { to: '/ai/recommendations', label: 'Recommendations', icon: 'sparkle' },
  { to: '/recently-viewed', label: 'Recently viewed', icon: 'clock' },
  { to: '/settings', label: 'Account settings', icon: 'settings' },
];

function DashboardLayout({ children }) {
  const { user, signOut } = useAuth();

  return (
    <PageLayout>
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="dashboard-user">
            <UserAvatar user={user} className="user-avatar" />
            <div>
              <strong>{user.name}</strong>
              <p className="muted small">Member since {user.joined}</p>
            </div>
          </div>

          <nav className="dashboard-menu">
            {menu.map((item) => (
              <NavLink key={item.to} to={item.to}>
                <Icon name={item.icon} size={18} /> {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="dashboard-tools">
            <p className="mono">AI tools</p>
            <Link to="/ai/search">
              <Icon name="search" size={16} /> Smart Search
            </Link>
            <Link to="/ai/recognition">
              <Icon name="image" size={16} /> Recognise a painting
            </Link>
            <Link to="/ai/assistant">
              <Icon name="chat" size={16} /> Ask the Assistant
            </Link>
          </div>

          <button className="text-button dashboard-signout" onClick={signOut}>
            Sign out
          </button>
        </aside>

        <div className="dashboard-content">{children}</div>
      </div>
    </PageLayout>
  );
}

export default DashboardLayout;
