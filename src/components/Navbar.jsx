// ------------------------------------------------------------
// Navbar — the header at the top of every page.
// Props:
//   transparent  - true on the Home page, where it sits over the hero image
// On small screens the links move into a full-screen menu.
// Visitors see "Sign In" and "Get Started"; signed-in users see
// their profile (initials + first name) with a small menu.
// ------------------------------------------------------------
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth, initialsOf, firstNameOf } from '../context/AuthContext';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore Art' },
  { to: '/categories', label: 'Categories' },
  { to: '/ai/search', label: 'AI Discovery' },
  { to: '/about', label: 'About' },
];

function Navbar({ transparent = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { favorites } = useFavorites();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate('/');
  }

  return (
    <header className={transparent ? 'navbar navbar-transparent' : 'navbar'}>
      <div className="navbar-inner">
        <Link to="/" className="logo">
          ArtMind <span>AI</span>
        </Link>

        <nav className="navbar-right">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.to}>
                {/* NavLink adds the "active" class when we are on that page */}
                <NavLink to={link.to} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <Link to="/ai/search" aria-label="Search">
              <Icon name="search" />
            </Link>
            <Link to="/favorites" aria-label="Favorites" className="fav-link">
              <Icon name="heart" />
              {favorites.length > 0 && <span className="fav-count">{favorites.length}</span>}
            </Link>
            {user ? (
              // Signed in: profile button with a small dropdown menu
              <div className="nav-profile">
                <button className="nav-profile-button" onClick={() => setProfileOpen(!profileOpen)} aria-expanded={profileOpen}>
                  <span className="nav-avatar">{initialsOf(user.name)}</span>
                  <span className="nav-profile-name">{firstNameOf(user.name)}</span>
                </button>
                {profileOpen && (
                  <div className="nav-profile-menu">
                    <div className="nav-profile-info">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)}>
                      <Icon name="home" size={16} /> My dashboard
                    </Link>
                    <Link to="/favorites" onClick={() => setProfileOpen(false)}>
                      <Icon name="heart" size={16} /> Favorites
                    </Link>
                    <button onClick={handleSignOut}>
                      <Icon name="arrowLeft" size={16} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Visitor: sign in / sign up buttons
              <>
                <Link to="/signin" className="nav-signin">
                  Sign In
                </Link>
                <Link to="/signup" className="nav-cta">
                  Get Started
                </Link>
              </>
            )}
            <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Icon name="menu" size={24} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu (only shown when menuOpen is true) */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-top">
            <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
              ArtMind <span>AI</span>
            </Link>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <Icon name="close" size={24} />
            </button>
          </div>
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)}>
                  {link.label}
                  <Icon name="arrowRight" size={18} />
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-buttons">
            {user ? (
              <>
                <p className="mobile-menu-user">
                  Signed in as <strong>{user.name}</strong>
                </p>
                <Link to="/dashboard" className="btn btn-dark" onClick={() => setMenuOpen(false)}>
                  My dashboard
                </Link>
                <button className="btn btn-outline" onClick={handleSignOut}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn-dark" onClick={() => setMenuOpen(false)}>
                  Get Started
                </Link>
                <Link to="/signin" className="btn btn-outline" onClick={() => setMenuOpen(false)}>
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
