// ------------------------------------------------------------
// Footer — dark footer shown at the bottom of every page.
// ------------------------------------------------------------
import { Link } from 'react-router-dom';
import Icon from './Icon';
import './Footer.css';

function Footer() {
  // Scroll smoothly back to the top of the page.
  function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-statement">
            <h2>
              Art for every
              <br />
              curious mind,
              <br />
              <span className="accent-light">curated by AI.</span>
            </h2>
            <Link to="/explore" className="btn btn-light">
              Start exploring <Icon name="arrowRight" size={14} />
            </Link>
            <p className="footer-credit">Artwork images: Art Institute of Chicago, CC0</p>
          </div>

          <div className="footer-columns">
            <div>
              <h4 className="footer-heading">Explore</h4>
              <Link to="/explore">Explore Art</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/favorites">Collections</Link>
              <Link to="/explore">Trending</Link>
              <Link to="/about">About ArtMind</Link>
            </div>
            <div>
              <h4 className="footer-heading">AI Tools</h4>
              <Link to="/ai/search">Smart Search</Link>
              <Link to="/ai/recognition">Image Recognition</Link>
              <Link to="/ai/recommendations">Recommendations</Link>
              <Link to="/ai/assistant">Art Assistant</Link>
              <span className="status-tag">
                <span className="dot" /> All AI services online
              </span>
            </div>
            <div>
              <h4 className="footer-heading">Contact</h4>
              <a href="mailto:hello@artmind.ai">hello@artmind.ai</a>
              <a href="tel:+2348002786463">+234 800 278 6463</a>
              <h4 className="footer-heading follow">Follow</h4>
              <a href="#">Instagram ↗</a>
              <a href="#">Pinterest ↗</a>
              <a href="#">X ↗</a>
            </div>
          </div>
        </div>

        <p className="footer-wordmark" aria-hidden="true">
          ArtMind
        </p>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© 2026 ArtMind AI. All rights reserved.</span>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Accessibility</a>
          </div>
          <button onClick={backToTop} className="back-to-top">
            Back to top <Icon name="arrowUp" size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
