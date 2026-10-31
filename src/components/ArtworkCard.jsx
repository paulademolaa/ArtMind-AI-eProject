import { Link } from 'react-router-dom';
import Icon from './Icon';
import { useFavorites } from '../context/FavoritesContext';
import './ArtworkCard.css';

function ArtworkCard({ artwork, tag, label }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(artwork.id);

  function handleHeartClick(event) {
    event.preventDefault();
    toggleFavorite(artwork.id);
  }

  return (
    <Link to={`/artwork/${artwork.id}`} className="artwork-card">
      <div className="artwork-card-image">
        <img src={artwork.image} alt={`${artwork.title} by ${artwork.artist}`} loading="lazy" />

        <button
          className={saved ? 'heart-button saved' : 'heart-button'}
          onClick={handleHeartClick}
          aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Icon name="heart" size={18} filled={saved} />
        </button>

        {tag && (
          <span className="ai-tag artwork-card-tag">
            <Icon name="sparkle" size={12} className="spark" /> {tag}
          </span>
        )}
      </div>

      <div className="artwork-card-meta">
        <p className="artwork-card-label">{label || `${artwork.category} · ${artwork.date}`}</p>
        <h4 className="artwork-card-title">{artwork.title}</h4>
        <p className="artwork-card-artist">{artwork.artist}</p>
      </div>
    </Link>
  );
}

export default ArtworkCard;
