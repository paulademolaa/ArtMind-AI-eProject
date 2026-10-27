// ------------------------------------------------------------
// Collection Detail — /collections/:id
// One AI-curated collection and all the paintings in it.
// ------------------------------------------------------------
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import { getArtwork } from '../data/artworks';
import { collections } from '../data/siteData';
import './Dashboard.css';
import './Collections.css';

function CollectionDetail() {
  const { id } = useParams();
  const collection = collections.find((item) => item.id === id);

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

  const works = collection.artworkIds.map(getArtwork);

  return (
    <DashboardLayout>
      <Link to="/collections" className="link-arrow">
        <Icon name="arrowLeft" size={14} /> All collections
      </Link>

      <div className="collection-hero">
        <img src={works[0].image} alt="" />
        <div>
          <span className="ai-badge">
            <Icon name="sparkle" size={12} /> {collection.label}
          </span>
          <h1>{collection.title}</h1>
          <p className="muted">{collection.description}</p>
          <p className="mono muted">{works.length} works</p>
        </div>
      </div>

      <div className="grid-3">
        {works.map((art) => (
          <ArtworkCard key={art.id} artwork={art} />
        ))}
      </div>
    </DashboardLayout>
  );
}

export default CollectionDetail;
