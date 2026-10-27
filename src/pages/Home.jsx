// ------------------------------------------------------------
// Home page
// Sections: Hero · Featured · Categories · Personalised picks ·
//           Smart search · How it works · Collections · Assistant
// ------------------------------------------------------------
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import artworks, { getArtwork, heroArtwork } from '../data/artworks';
import { categories, collections } from '../data/siteData';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  // Send the search text to the Smart Search page, e.g. /ai/search?q=blue+seascapes
  function handleSearch(event) {
    event.preventDefault();
    navigate('/ai/search?q=' + encodeURIComponent(query || 'calm blue seascapes'));
  }

  const featured = ['still-life-with-flowers', 'two-sisters-on-the-terrace', 'view-of-cotopaxi', 'composition-no-1-gray-red'].map(getArtwork);

  const picks = [
    { id: 'painting-with-green-center', tag: 'Abstract match', match: '98% match', reason: 'You viewed 6 Kandinsky works' },
    { id: 'mist-rising-in-the-catskills', tag: 'Warm palette', match: '94% match', reason: 'Shares the golden tones you save' },
    { id: 'interrupted-reading', tag: 'Like your saves', match: '91% match', reason: 'Similar to Two Sisters, saved last week' },
  ];

  const steps = [
    {
      number: '01',
      label: 'Explore',
      title: 'Explore the gallery',
      text: 'Browse paintings across six categories. Filter by style, medium, surface and colour.',
      link: '/explore',
      linkText: 'Browse the gallery',
    },
    {
      number: '02',
      label: 'Discover',
      title: 'Discover with AI',
      text: 'Describe what you want in plain words, upload a photo for recognition, or ask the Art Assistant.',
      link: '/ai/search',
      linkText: 'Try Smart Search',
    },
    {
      number: '03',
      label: 'Save',
      title: 'Save what inspires you',
      text: 'Keep favourites and build collections. Each save teaches ArtMind what to show you next.',
      link: '/favorites',
      linkText: 'See your favourites',
    },
  ];

  const featuredCollection = collections[0];

  return (
    <PageLayout transparentNav>
      {/* ---------- HERO ---------- */}
      <section className="hero" style={{ backgroundImage: `url(${heroArtwork.image})` }}>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-top">
            <p className="hero-eyebrow">AI-powered art discovery · {artworks.length} paintings to explore</p>
            <div className="hero-now">
              <p className="hero-now-label">
                <span className="dot" /> On view today
              </p>
              <p>
                <span className="hero-now-title">{heroArtwork.title}</span>
                <span className="mono">
                  Monet · {heroArtwork.date}
                </span>
              </p>
            </div>
          </div>

          <div className="hero-bottom">
            <div className="hero-copy">
              <h1 className="hero-title">
                Discover art
                <br />
                beyond
                <br />
                <em>imagination.</em>
              </h1>
              <p className="hero-text">
                Explore extraordinary paintings, uncover artistic stories, and discover what inspires you with the
                intelligence of AI.
              </p>
              <div className="hero-buttons">
                <Link to="/explore" className="btn btn-light">
                  Explore artworks <Icon name="arrowRight" size={14} />
                </Link>
                <Link to="/ai/search" className="btn btn-ghost-light">
                  Discover with AI <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </div>

            <Link to="/artwork/water-lily-pond" className="hero-card">
              <div className="hero-card-top">
                <span>Featured · Landscape</span>
                <span>01 / 06</span>
              </div>
              <p className="hero-card-artist">Claude Monet</p>
              <p className="hero-card-title">
                <em>Water Lily Pond</em> 1900
              </p>
              <p className="muted small">Oil on canvas · Art Institute of Chicago</p>
              <div className="hero-card-match">
                <span className="mono">
                  <Icon name="sparkle" size={13} /> 94% match for you
                </span>
                <span className="hero-card-link">View artwork</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FEATURED ARTWORKS ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Featured this week</p>
              <h2>Featured Artworks</h2>
            </div>
            <Link to="/explore" className="link-arrow">
              View all artworks <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          <div className="grid-4">
            {featured.map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CATEGORIES ---------- */}
      <section className="section section-surface">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Six ways in</p>
              <h2>Explore by Category</h2>
            </div>
            <Link to="/categories" className="link-arrow">
              All categories <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          <div className="grid-3 category-grid">
            {categories.map((cat) => (
              <Link to={`/categories/${cat.name.toLowerCase()}`} className="category-card" key={cat.name}>
                <div className="category-card-image">
                  <img src={getArtwork(cat.coverId).image} alt={cat.name} loading="lazy" />
                </div>
                <div className="category-card-row">
                  <div>
                    <h3>{cat.name}</h3>
                    <p className="mono muted">{cat.count} artworks</p>
                  </div>
                  <span className="link-arrow">
                    Explore <Icon name="arrowRight" size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PERSONALISED RECOMMENDATIONS ---------- */}
      <section className="section">
        <div className="container taste">
          <div className="taste-copy">
            <span className="ai-badge">
              <Icon name="sparkle" size={12} /> Personalised recommendations
            </span>
            <h2>
              Art That Understands <span className="accent">Your Taste.</span>
            </h2>
            <p className="muted">
              ArtMind learns from what you linger on, save and search — then shows paintings that share their style,
              palette or mood. You can always see why something was suggested.
            </p>
            <ul className="taste-signals">
              <li>
                <Icon name="eye" /> <strong>Viewing behaviour</strong> — styles you spend time with
              </li>
              <li>
                <Icon name="heart" /> <strong>Saved artworks</strong> — your favourites guide every pick
              </li>
              <li>
                <Icon name="palette" /> <strong>Colour affinity</strong> — palettes you return to
              </li>
            </ul>
            <Link to="/ai/recommendations" className="btn btn-dark">
              See your recommendations <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="taste-cards">
            {picks.map((pick) => {
              const art = getArtwork(pick.id);
              return (
                <Link to={`/artwork/${art.id}`} className="rec-card" key={art.id}>
                  <div className="rec-card-image">
                    <img src={art.image} alt={art.title} loading="lazy" />
                    <span className="ai-tag rec-card-tag">
                      <Icon name="sparkle" size={12} className="spark" /> {pick.tag}
                    </span>
                  </div>
                  <div className="rec-card-top">
                    <span>{pick.match}</span>
                    <span className="muted">{art.category}</span>
                  </div>
                  <h4 className="rec-card-title">{art.title}</h4>
                  <p className="muted small">
                    {art.artist} · {art.date}
                  </p>
                  <p className="rec-card-reason">{pick.reason}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- SMART SEARCH (dark) ---------- */}
      <section className="section section-dark smart-search">
        <div className="container smart-search-inner">
          <p className="eyebrow eyebrow-light">Natural-language search</p>
          <h2>Describe it. We’ll find it.</h2>
          <p className="smart-search-text">
            Search the way you think about art — by mood, medium, colour or subject. ArtMind understands what you mean.
          </p>
          <form className="search-bar" onSubmit={handleSearch}>
            <Icon name="sparkle" className="search-bar-icon" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find abstract paintings with warm earthy tones…"
              aria-label="Describe the art you want to find"
            />
            <button type="submit" className="btn btn-dark">
              Search <Icon name="arrowRight" size={14} />
            </button>
          </form>
          <div className="search-suggestions">
            <span>Try:</span>
            {['Oil paintings with nature themes', 'Watercolor landscapes', 'Modern abstract on canvas', 'Calm blue seascapes'].map(
              (suggestion) => (
                <Link key={suggestion} to={'/ai/search?q=' + encodeURIComponent(suggestion)} className="chip chip-dark">
                  {suggestion}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">How ArtMind works</p>
              <h2>
                From first glance
                <br />
                <span className="accent">to favourite.</span>
              </h2>
            </div>
            <p>
              Three simple steps. Browse a hand-tagged collection, let AI read your taste, and keep what moves you —
              every save makes the next suggestion sharper.
            </p>
          </div>

          <div className="steps">
            {steps.map((step, index) => (
              <div className="step" key={step.number}>
                <span className={index === 0 ? 'step-number active' : 'step-number'}>{step.number}</span>
                <div className={`step-visual step-visual-${index + 1}`}>
                  {index === 0 && (
                    <>
                      <img src={getArtwork('cliff-walk-at-pourville').image} alt="" className="fan fan-1" />
                      <img src={getArtwork('bouquet-in-earthenware-vase').image} alt="" className="fan fan-3" />
                      <img src={getArtwork('improvisation-no-30').image} alt="" className="fan fan-2" />
                    </>
                  )}
                  {index === 1 && (
                    <div className="mini-search">
                      <span>
                        <Icon name="sparkle" size={14} /> Calm blue seascapes
                      </span>
                      <div className="mini-results">
                        <img src={getArtwork('the-herring-net').image} alt="" />
                        <img src={getArtwork('cliff-walk-at-pourville').image} alt="" />
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="mini-save">
                      <img src={getArtwork('water-lily-pond').image} alt="" />
                      <span className="mini-heart">
                        <Icon name="heart" size={18} filled />
                      </span>
                      <span className="mini-toast">
                        <Icon name="check" size={14} /> Saved to “Quiet Waters”
                      </span>
                    </div>
                  )}
                </div>
                <p className="step-label">
                  Step {step.number} · {step.label}
                </p>
                <h3>{step.title}</h3>
                <p className="muted">{step.text}</p>
                <Link to={step.link} className="link-arrow">
                  {step.linkText} <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CURATED COLLECTIONS ---------- */}
      <section className="section section-surface">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Curated by AI, refined by editors</p>
              <h2>
                Collections worth
                <br />
                <span className="accent">getting lost in.</span>
              </h2>
            </div>
            <Link to="/favorites" className="link-arrow">
              Browse all collections <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="featured-collection">
            <div className="featured-collection-image">
              <img src={getArtwork('water-lily-pond').image} alt="Water Lily Pond by Claude Monet" />
              <span className="ai-tag">
                <Icon name="sparkle" size={12} className="spark" /> {featuredCollection.label}
              </span>
            </div>
            <div className="featured-collection-text">
              <p className="mono muted">Collection of the month</p>
              <h2>{featuredCollection.title}</h2>
              <p className="muted">{featuredCollection.description}</p>
              <div className="collection-thumbs">
                {featuredCollection.artworkIds.slice(1, 5).map((id) => (
                  <img key={id} src={getArtwork(id).image} alt={getArtwork(id).title} />
                ))}
              </div>
              <div className="ai-note">
                <Icon name="sparkle" size={14} className="spark" /> Matched on calm composition and blue-green palettes
              </div>
              <Link to="/favorites" className="btn btn-dark">
                View collection <Icon name="arrowRight" size={14} />
              </Link>
            </div>
          </div>

          <div className="grid-3 more-collections">
            {collections.slice(1).map((collection) => (
              <Link to="/favorites" className="collection-card" key={collection.id}>
                <div className="collection-card-image">
                  <img src={getArtwork(collection.artworkIds[0]).image} alt={collection.title} loading="lazy" />
                  <span className="ai-tag">{collection.label}</span>
                </div>
                <h3>{collection.title}</h3>
                <p className="muted small">{collection.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- AI ART ASSISTANT ---------- */}
      <section className="section">
        <div className="container assistant-preview">
          <div className="chat-preview" style={{ backgroundImage: `url(${getArtwork('la-grande-jatte-oil-sketch').image})` }}>
            <div className="chat-window">
              <div className="chat-window-header">
                <span className="chat-avatar">
                  <Icon name="sparkle" size={14} />
                </span>
                <div>
                  <strong>ArtMind Assistant</strong>
                  <p className="mono muted">● Online · replies in seconds</p>
                </div>
              </div>
              <p className="bubble-user">Who painted this — and why does it shimmer?</p>
              <p className="bubble-ai">
                That’s Georges Seurat’s oil sketch for A Sunday on La Grande Jatte (1884). The shimmer is pointillism:
                small dabs of pure colour that blend in your eye.
              </p>
            </div>
          </div>

          <div className="assistant-copy">
            <p className="eyebrow">AI Art Assistant</p>
            <h2>
              Ask anything
              <br />
              <span className="accent">about art.</span>
            </h2>
            <p className="lead">
              Styles, techniques, artists — or just “what should I look at next?” Answers come in plain language and link
              straight to paintings in the gallery.
            </p>
            <ul className="prompt-list">
              {[
                'What is abstract expressionism?',
                'Explain oil vs watercolor painting',
                'Show me paintings with blue colour themes',
                'Recommend landscape paintings',
              ].map((question) => (
                <li key={question}>
                  <Link to={'/ai/assistant?q=' + encodeURIComponent(question)}>
                    <Icon name="chat" size={18} /> {question} <Icon name="arrowRight" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/ai/assistant" className="btn btn-dark">
              Start a conversation <Icon name="arrowRight" size={14} />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default Home;
