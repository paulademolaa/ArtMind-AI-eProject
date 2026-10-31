import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import { getArtwork } from '../data/artworks';
import { collections } from '../data/siteData';
import './Dashboard.css';
import './Favorites.css';
import './Collections.css';

function addedDate(index) {
  const date = new Date();
  date.setDate(date.getDate() - index * 5 - 1);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function CollectionDetail() {
  const { id } = useParams();
  const collection = collections.find((item) => item.id === id);
  const storageKey = `artmind-removed-${id}`;
  const [removed, setRemoved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  });
  const [view, setView] = useState('list'); // Figma shows the list view
  const [copied, setCopied] = useState(false);

  if (!collection) {
    return (
      <DashboardLayout>
        <h1>Collection not found</h1>
        <Link to="/collections" className="link-arrow">
          <Icon name="arrowLeft" size={14} /> All collections
        </Link>
      </DashboardLayout>
    );
  }

  const works = collection.artworkIds.filter((artId) => !removed.includes(artId)).map(getArtwork);

  function removeWork(artId) {
    const list = [...removed, artId];
    setRemoved(list);
    localStorage.setItem(storageKey, JSON.stringify(list));
  }

  function share() {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <DashboardLayout>
      <p className="breadcrumb">
        <Link to="/collections">Collections</Link> › {collection.title}
      </p>

      <div className="collection-head">
        <div className="mosaic collection-head-mosaic">
          {collection.artworkIds.slice(0, 3).map((artId) => (
            <img key={artId} src={getArtwork(artId).image} alt="" />
          ))}
        </div>
        <div className="collection-head-text">
          <span className="ai-badge">
            <Icon name="sparkle" size={12} /> {collection.label}
          </span>
          <h1>{collection.title}</h1>
          <p className="muted">
            {collection.description} — {works.length} works
          </p>
        </div>
        <div className="collection-head-actions">
          <button className="btn btn-outline" onClick={share}>
            {copied ? 'Link copied' : 'Share'}
          </button>
          <Link to="/explore" className="btn btn-dark">
            Add artworks
          </Link>
        </div>
      </div>

      <div className="fav-toolbar">
        <strong>{works.length} artworks</strong>
        <div className="view-toggle">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid view">
            <Icon name="grid" size={18} />
          </button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view">
            <Icon name="menu" size={18} />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="fav-masonry">
          {works.map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      ) : (
        <table className="fav-table">
          <thead>
            <tr>
              <th>Artwork</th>
              <th>Category</th>
              <th>Medium</th>
              <th>Added</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {works.map((art, index) => (
              <tr key={art.id}>
                <td>
                  <Link to={`/artwork/${art.id}`} className="fav-table-art">
                    <img src={art.image} alt="" />
                    <div>
                      <strong>{art.title}</strong>
                      <p className="muted small">
                        {art.artist} · {art.date}
                      </p>
                    </div>
                  </Link>
                </td>
                <td>{art.category}</td>
                <td className="muted">{art.medium}</td>
                <td className="mono muted">{addedDate(index)}</td>
                <td>
                  <button className="text-button" onClick={() => removeWork(art.id)}>
                    <Icon name="trash" size={16} /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
}

export default CollectionDetail;
