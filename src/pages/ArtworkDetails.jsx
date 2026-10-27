// ------------------------------------------------------------
// Artwork Details page — /artwork/:id
// Shows one painting: big image, facts, description,
// colour palette, save + download buttons, similar artworks.
// ------------------------------------------------------------
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import { getArtwork, getSimilar } from '../data/artworks';
import { useFavorites } from '../context/FavoritesContext';
import { getRecommendations } from '../utils/fakeAI';
import { addRecentlyViewed } from '../utils/recentlyViewed';
import './ArtworkDetails.css';

// Names for the palette swatches (in the same order as artwork.palette).
const colourNames = ['Main tone', 'Second tone', 'Accent', 'Highlight', 'Shadow'];

function ArtworkDetails() {
  const { id } = useParams(); // the ":id" part of the address
  const artwork = getArtwork(id);
  const { isFavorite, toggleFavorite, favorites } = useFavorites();

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
  const recommended = getRecommendations([...favorites, artwork.id], 4);

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
        <div className="details-stage">
          <img src={artwork.image} alt={`${artwork.title} by ${artwork.artist}`} />
        </div>

        {/* ---- Information ---- */}
        <div className="details-info">
          <p className="eyebrow">
            {artwork.category} · {artwork.style}
          </p>
          <h1>{artwork.title}</h1>
          <p className="details-artist">
            {artwork.artist} · {artwork.date}
          </p>

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

          <h4 className="details-subtitle">Colour palette</h4>
          <div className="swatches">
            {artwork.palette.map((hex, index) => (
              <div key={hex + index} className="swatch">
                <span style={{ background: hex }} />
                <small>{colourNames[index]}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-surface">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Similar artworks</p>
              <h2>Same style, palette or subject</h2>
            </div>
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
