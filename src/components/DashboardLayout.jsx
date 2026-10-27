// ------------------------------------------------------------
// DashboardLayout — the signed-in area: a sidebar on the left and
// the page content on the right. Used by Dashboard, Favorites and
// Analytics.
// ------------------------------------------------------------
import { Link, NavLink } from 'react-router-dom';
import PageLayout from './PageLayout';
import Icon from './Icon';
import './DashboardLayout.css';

const menu = [
  { to: '/dashboard', label: 'Overview', icon: 'home' },
  { to: '/favorites', label: 'Favorites', icon: 'heart' },
  { to: '/ai/recommendations', label: 'Recommendations', icon: 'sparkle' },
  { to: '/analytics', label: 'Insights', icon: 'chart' },
];

function DashboardLayout({ children }) {
  return (
    <PageLayout>
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="dashboard-user">
            <span className="user-avatar">AO</span>
            <div>
              <strong>Amara Okafor</strong>
              <p className="muted small">Member since 2026</p>
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
        </aside>

        <div className="dashboard-content">{children}</div>
      </div>
    </PageLayout>
  );
}

export default DashboardLayout;
