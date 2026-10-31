import { Link } from 'react-router-dom';
import { getArtwork } from '../data/artworks';
import './AuthLayout.css';

function AuthLayout({ artworkId, quote, children }) {
  const art = getArtwork(artworkId);

  return (
    <div className="auth">
      <div className="auth-art" style={{ backgroundImage: `url(${art.image})` }}>
        <div className="auth-art-shade" />
        <Link to="/" className="logo auth-logo">
          ArtMind <span>Ai</span>
        </Link>
        <div className="auth-quote">
          <p>{quote}</p>
          <small>
            {art.title} — {art.artist}, {art.date}
          </small>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-form">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
