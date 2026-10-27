// ------------------------------------------------------------
// Artwork Details page — /artwork/:id
// Shows one painting: big image, facts, description,
// colour palette, save + download buttons, similar artworks.
// ------------------------------------------------------------
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import artworks, { getArtwork, getSimilar } from '../data/artworks';
import { initialsOf } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { getRecommendations } from '../utils/fakeAI';
import { addRecentlyViewed } from '../utils/recentlyViewed';
import './ArtworkDetails.css';

// The three thumbnails under the image: whole painting + two close-ups.
// "position" decides which part of the painting the close-up shows.
const views = [
  { label: 'Whole painting', zoom: 1, position: 'center' },
  { label: 'Detail, left', zoom: 2.2, position: '20% 40%' },
  { label: 'Detail, right', zoom: 2.2, position: '80% 60%' },
];

function ArtworkDetails() {
  const { id } = useParams(); // the ":id" part of the address
  const artwork = getArtwork(id);
  const { isFavorite, toggleFavorite, favorites } = useFavorites();
  const [view, setView] = useState(0); // which thumbnail is selected
  const [overlay, setOverlay] = useState(null); // 'zoom' | 'room' | null
  const [copied, setCopied] = useState(false);

  // Remember this painting for the "Recently viewed" page.
  useEffect(() => {
    if (artwork) addRecentlyViewed(artwork.id);
  }, [id]);

  // If someone types a wrong address, show a friendly message.
  if (!artwork) {
    return (
      <PageLayout>
        <div className="container not-found-box">
          <h1>Artwork not found</h1>
          <Link to="/explore" className="btn btn-dark">
            Back to the gallery
          </Link>
        </div>
      </PageLayout>
    );
  }

  const saved = isFavorite(artwork.id);
  const similar = getSimilar(artwork, 4);
  // Recommendations that are NOT already shown in "similar"
  const recommended = getRecommendations([...favorites, artwork.id, ...similar.map((art) => art.id)], 4);
  const worksByArtist = artworks.filter((art) => art.artist === artwork.artist).length;

  // Copy the page address so it can be shared.
  function share() {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ---- Downloads ----
  // Word: we build a small HTML document and save it with a .doc ending.
  function downloadWord() {
    const html = `
      <html><body>
        <h1>${artwork.title}</h1>
        <p><b>Artist:</b> ${artwork.artist}<br/>
        <b>Date:</b> ${artwork.date}<br/>
        <b>Category:</b> ${artwork.category}<br/>
        <b>Style:</b> ${artwork.style}<br/>
        <b>Medium:</b> ${artwork.medium}<br/>
        <b>Surface:</b> ${artwork.surface}</p>
        <p>${artwork.description}</p>
        <p>Image: Art Institute of Chicago, CC0.</p>
      </body></html>`;
    const file = new Blob([html], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = `${artwork.id}-details.doc`;
    link.click();
  }

  // PDF: open the browser's print window; choose "Save as PDF".
  function downloadPdf() {
    window.print();
  }

  return (
    <PageLayout>
      <div className="container details-top">
        <p className="breadcrumb">
          <Link to="/explore">Explore Art</Link> / <Link to={`/categories/${artwork.category.toLowerCase()}`}>{artwork.category}</Link> /{' '}
          {artwork.title}
        </p>
        <Link to="/explore" className="link-arrow">
          <Icon name="arrowLeft" size={14} /> Back to results
        </Link>
      </div>

      <section className="container details">
        {/* ---- Big image ---- */}
        <div className="details-media">
          <div className="details-stage">
            <img
              src={artwork.image}
              alt={`${artwork.title} by ${artwork.artist}`}
              style={{ transform: `scale(${views[view].zoom})`, transformOrigin: views[view].position }}
            />
          </div>

          <div className="details-tools">
            <div className="details-thumbs">
              {views.map((item, index) => (
                <button
                  key={item.label}
                  className={view === index ? 'active' : ''}
                  onClick={() => setView(index)}
                  aria-label={item.label}
                >
                  <img src={artwork.image} alt="" style={{ objectPosition: item.position }} />
                </button>
              ))}
            </div>
            <div className="details-tool-buttons">
              <button onClick={() => setOverlay('zoom')}>
                <Icon name="search" size={14} /> Zoom
              </button>
              <button onClick={() => setOverlay('room')}>
                <Icon name="eye" size={14} /> View in room
              </button>
              <button onClick={share}>
                <Icon name="send" size={14} /> {copied ? 'Link copied' : 'Share'}
              </button>
            </div>
          </div>
        </div>

        {/* Full-screen view: "Zoom" or "View in room" (click anywhere to close) */}
        {overlay && (
          <div className={overlay === 'room' ? 'details-overlay room' : 'details-overlay'} onClick={() => setOverlay(null)}>
            <img src={artwork.image} alt={artwork.title} />
            {overlay === 'room' && <div className="room-sofa" />}
            <button className="details-overlay-close" aria-label="Close">
              <Icon name="close" size={22} />
            </button>
          </div>
        )}

        {/* ---- Information ---- */}
        <div className="details-info">
          <p className="eyebrow">
            {artwork.category} · {artwork.style}
          </p>
          <h1>{artwork.title}</h1>
          <div className="details-artist">
            <span className="details-artist-badge">{initialsOf(artwork.artist)}</span>
            <div>
              <strong>{artwork.artist}</strong>
              <p className="muted small">
                {artwork.date} · {worksByArtist} {worksByArtist === 1 ? 'work' : 'works'} in this collection
              </p>
            </div>
            <Link to={`/ai/search?q=${encodeURIComponent(artwork.artist)}`} className="details-view-artist">
              View artist
            </Link>
          </div>

          <div className="details-actions">
            <button className={saved ? 'btn btn-saved' : 'btn btn-dark'} onClick={() => toggleFavorite(artwork.id)}>
              <Icon name="heart" size={16} filled={saved} /> {saved ? 'Saved' : 'Save to favorites'}
            </button>
            <button className="btn btn-outline" onClick={downloadPdf}>
              <Icon name="download" size={16} /> PDF
            </button>
            <button className="btn btn-outline" onClick={downloadWord}>
              <Icon name="download" size={16} /> Word
            </button>
          </div>

          <h4 className="details-subtitle">Catalogue details</h4>
          <dl className="details-facts">
            <div>
              <dt>Date</dt>
              <dd>{artwork.date}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{artwork.category}</dd>
            </div>
            <div>
              <dt>Artistic style</dt>
              <dd>{artwork.style}</dd>
            </div>
            <div>
              <dt>Surface type</dt>
              <dd>{artwork.surface}</dd>
            </div>
            <div>
              <dt>Color medium</dt>
              <dd>{artwork.medium}</dd>
            </div>
            <div>
              <dt>Collection</dt>
              <dd>
                <a href={artwork.sourceUrl} target="_blank" rel="noreferrer">
                  Art Institute of Chicago ↗
                </a>
              </dd>
            </div>
          </dl>

          <p className="details-description">{artwork.description}</p>

        </div>
      </section>

      <section className="section section-surface">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Similar artworks</p>
              <h2>Because it shares style, palette and subject</h2>
            </div>
            <Link to={`/categories/${artwork.category.toLowerCase()}`} className="link-arrow">
              See more <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          <div className="grid-4">
            {similar.map((art) => (
              <ArtworkCard key={art.id} artwork={art} tag={art.style === artwork.style ? 'Same style' : 'Same category'} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Recommended for you</p>
              <h2>You may also love</h2>
            </div>
            <Link to="/ai/recommendations" className="link-arrow">
              Open recommendations <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          <div className="grid-4">
            {recommended.map((art) => (
              <ArtworkCard key={art.id} artwork={art} tag={art.reason} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default ArtworkDetails;
