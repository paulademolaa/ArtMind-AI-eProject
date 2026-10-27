// ------------------------------------------------------------
// Navbar — the header at the top of every page.
// Props:
//   transparent  - true on the Home page, where it sits over the hero image
// On small screens the links move into a full-screen menu.
// ------------------------------------------------------------
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';
import { useFavorites } from '../context/FavoritesContext';
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
  const { favorites } = useFavorites();

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
            <Link to="/signin" className="nav-signin">
              Sign In
            </Link>
            <Link to="/signup" className="nav-cta">
              Get Started
            </Link>
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
            <Link to="/signup" className="btn btn-dark" onClick={() => setMenuOpen(false)}>
              Get Started
            </Link>
            <Link to="/signin" className="btn btn-outline" onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
