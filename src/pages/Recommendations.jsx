// ------------------------------------------------------------
// AI Recommendations — /ai/recommendations
// Uses getRecommendations() (utils/fakeAI.js) with your favourites.
// "Tune my interests" lets you pick categories you like; the
// recommendation rows update straight away.
// ------------------------------------------------------------
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import artworks, { getArtwork } from '../data/artworks';
import { collections } from '../data/siteData';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth, firstNameOf } from '../context/AuthContext';
import { getRecommendations } from '../utils/fakeAI';
import './Recommendations.css';

const allCategories = ['Abstract', 'Landscape', 'Flower', 'Nature', 'Figurative', 'Religious'];

const colourThemes = [
  { name: 'Moss & Wisteria', colours: ['#4A6141', '#788C6A', '#8C7895', '#C09E99'], ids: ['water-lily-pond', 'pond-in-the-woods'] },
  { name: 'Harbour Blues', colours: ['#2E4A7A', '#7399BF', '#DBD1B3', '#404D59'], ids: ['the-herring-net', 'cliff-walk-at-pourville'] },
  { name: 'Golden Hour', colours: ['#C8873A', '#9E4433', '#DCCBA8', '#4C3726'], ids: ['mist-rising-in-the-catskills', 'home-of-the-heron'] },
];

// "Good morning" / "Good afternoon" / "Good evening" from the clock
function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function Recommendations() {
  const { favorites } = useFavorites();
  const { user } = useAuth();
  const [interests, setInterests] = useState(['Landscape', 'Nature']);
  const [panelOpen, setPanelOpen] = useState(false);
  const [tab, setTab] = useState('For You');

  function toggleInterest(category) {
    if (interests.includes(category)) {
      setInterests(interests.filter((item) => item !== category));
    } else {
      setInterests([...interests, category]);
    }
  }

  const forYou = getRecommendations(favorites, 4);
  const basedOnInterests = artworks.filter((art) => interests.includes(art.category) && !favorites.includes(art.id)).slice(0, 4);
  const similarStyles = artworks.filter((art) => art.style === 'Impressionism').slice(0, 4);
  const trending = ['la-grande-jatte-oil-sketch', 'virgin-and-child-with-two-angels', 'valley-of-aosta', 'bouquet-in-earthenware-vase'].map(getArtwork);

  const tabs = ['For You', 'Based on Interests', 'Colour Themes', 'Trending'];

  return (
    <PageLayout>
      <section className="container rec-header">
        <div>
          <span className="ai-badge">
            <Icon name="sparkle" size={12} /> Updated this morning
          </span>
          <h1>{user ? `${greeting()}, ${firstNameOf(user.name)}.` : 'Picks chosen for you.'}</h1>
          <p className="lead">Your taste leans toward Impressionist light, quiet water and earthy palettes. Here’s what we picked for you.</p>
        </div>
        <button className="btn btn-outline" onClick={() => setPanelOpen(!panelOpen)}>
          {panelOpen ? 'Done' : 'Tune my interests'}
        </button>
      </section>

      {/* Interest selection panel */}
      {panelOpen && (
        <section className="container">
          <div className="interest-panel">
            <h3>What draws you in?</h3>
            <p className="muted">Pick the categories you like. Recommendations update straight away.</p>
            <div className="interest-grid">
              {allCategories.map((category) => {
                const cover = artworks.find((art) => art.category === category);
                const selected = interests.includes(category);
                return (
                  <button key={category} className={selected ? 'interest selected' : 'interest'} onClick={() => toggleInterest(category)}>
                    <img src={cover.image} alt="" />
                    {selected && (
                      <span className="interest-check">
                        <Icon name="check" size={14} />
                      </span>
                    )}
                    <span>{category}</span>
                  </button>
                );
              })}
            </div>
            <p className="mono muted">{interests.length} selected</p>
          </div>
        </section>
      )}

      {/* Tabs scroll the page to each section */}
      <div className="container rec-tabs">
        {tabs.map((name) => (
          <a key={name} href={'#' + name.replace(/\s/g, '-').toLowerCase()} className={tab === name ? 'rec-tab active' : 'rec-tab'} onClick={() => setTab(name)}>
            {name}
          </a>
        ))}
      </div>

      <section className="container rec-row" id="for-you">
        <div className="section-header">
          <div>
            <p className="eyebrow">Recommended for you</p>
            <h3>Picked for you today</h3>
          </div>
        </div>
        <div className="grid-4">
          {forYou.map((art) => (
            <ArtworkCard key={art.id} artwork={art} tag={art.reason} />
          ))}
        </div>
      </section>

      <section className="section-surface" id="based-on-interests">
        <div className="container rec-row">
          <div className="section-header">
            <div>
              <p className="eyebrow">Based on your interests</p>
              <h3>Because you like {interests.length > 0 ? interests.join(' & ') : '…'}</h3>
            </div>
          </div>
          {basedOnInterests.length > 0 ? (
            <div className="grid-4">
              {basedOnInterests.map((art) => (
                <ArtworkCard key={art.id} artwork={art} tag={'You like ' + art.category} />
              ))}
            </div>
          ) : (
            <p className="muted">Choose some interests with “Tune my interests” to see this row.</p>
          )}
        </div>
      </section>

      <section className="container rec-row">
        <div className="section-header">
          <div>
            <p className="eyebrow">Similar artistic styles</p>
            <h3>More Impressionism</h3>
          </div>
        </div>
        <div className="grid-4">
          {similarStyles.map((art) => (
            <ArtworkCard key={art.id} artwork={art} tag="Your top style" />
          ))}
        </div>
      </section>

      <section className="container rec-row" id="colour-themes">
        <div className="section-header">
          <div>
            <p className="eyebrow">Matching colour themes</p>
            <h3>Palettes you return to</h3>
          </div>
        </div>
        <div className="grid-3">
          {colourThemes.map((theme) => (
            <div key={theme.name} className="theme-card">
              <div className="theme-colours">
                {theme.colours.map((colour) => (
                  <span key={colour} style={{ background: colour }} />
                ))}
              </div>
              <div className="theme-images">
                {theme.ids.map((id) => (
                  <Link key={id} to={`/artwork/${id}`}>
                    <img src={getArtwork(id).image} alt={getArtwork(id).title} />
                  </Link>
                ))}
              </div>
              <h4>{theme.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="section-dark" id="trending">
        <div className="container rec-row">
          <p className="eyebrow eyebrow-light">Trending paintings</p>
          <h3>What the community is exploring this week</h3>
          <div className="trending">
            {trending.map((art, index) => (
              <Link key={art.id} to={`/artwork/${art.id}`} className="trend">
                <span className="trend-number">0{index + 1}</span>
                <img src={art.image} alt="" />
                <div>
                  <strong>{art.title}</strong>
                  <p className="small">{art.artist}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container rec-row">
        <div className="section-header">
          <div>
            <p className="eyebrow">AI-curated collections</p>
            <h3>Built around your saves</h3>
          </div>
        </div>
        <div className="grid-3">
          {collections.slice(0, 3).map((collection) => (
            <Link to="/favorites" key={collection.id} className="collection-mini">
              <img src={getArtwork(collection.artworkIds[0]).image} alt="" />
              <h4>{collection.title}</h4>
              <p className="mono muted">
                {collection.artworkIds.length} works · {collection.label}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

export default Recommendations;
