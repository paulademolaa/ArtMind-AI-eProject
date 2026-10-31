import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Icon from '../components/Icon';
import artworks, { getArtwork } from '../data/artworks';
import { categories } from '../data/siteData';
import './Categories.css';

const styleExamples = [
  { name: 'Impressionism', artworkId: 'water-lily-pond' },
  { name: 'Expressionism', artworkId: 'painting-with-green-center' },
  { name: 'Early Renaissance', artworkId: 'virgin-and-child-with-two-angels' },
  { name: 'Realism', artworkId: 'view-of-genoa' },
  { name: 'Hudson River School', artworkId: 'distant-view-of-niagara-falls' },
  { name: 'Post-Impressionism', artworkId: 'still-life-with-flowers' },
];

function CategoryTile({ category, size, topTag }) {
  const cover = getArtwork(category.coverId);
  return (
    <Link to={`/categories/${category.name.toLowerCase()}`} className={`category-tile tile-${size}`}>
      <img src={cover.image} alt={`${category.name} — ${cover.title}`} loading="lazy" />
      <div className="tile-shade" />
      <div className="tile-styles">
        {category.styles.map((style) => (
          <span key={style}>{style}</span>
        ))}
      </div>
      {topTag && (
        <span className="ai-tag tile-ai">
          <Icon name="sparkle" size={12} className="spark" /> {topTag}
        </span>
      )}
      <div className="tile-text">
        <p className="mono">{category.count} artworks</p>
        <h2>{category.name}</h2>
        <p className="small">{category.description}</p>
        <span className="link-arrow">
          Explore collection <Icon name="arrowRight" size={14} />
        </span>
      </div>
    </Link>
  );
}

function Categories() {
  const find = (name) => categories.find((cat) => cat.name === name);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('explored');

  function handleSearch(event) {
    event.preventDefault();
    if (query.trim()) navigate(`/ai/search?q=${encodeURIComponent(query)}`);
  }

  const toNumber = (count) => parseInt(count.replace(/,/g, ''));
  const jumpList =
    sort === 'explored'
      ? [...categories].sort((a, b) => toNumber(b.count) - toNumber(a.count))
      : [...categories].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <PageLayout>
      <section className="container categories-header">
        <div>
          <p className="eyebrow">Categories · {artworks.length} paintings</p>
          <h1 className="display">
            Six ways into
            <br />
            <span className="accent">the collection.</span>
          </h1>
          <p className="lead">
            Every painting is classified by AI and reviewed by our editors. Start with a category, then refine by style,
            medium and colour.
          </p>
        </div>
        <div className="categories-tools">
          <form className="search-input categories-search" onSubmit={handleSearch}>
            <Icon name="search" size={18} />
            <input
              type="search"
              placeholder="Search a category or style…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search a category or style"
            />
          </form>
          <div className="stats">
            <div>
              <strong>6</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>{new Set(artworks.map((a) => a.style)).size}</strong>
              <span>Styles</span>
            </div>
            <div>
              <strong>{new Set(artworks.map((a) => a.artist)).size}</strong>
              <span>Artists</span>
            </div>
          </div>
          <Link to="/ai/recommendations" className="ai-note">
            <Icon name="sparkle" size={14} className="spark" /> Not sure where to start? Let AI suggest a category →
          </Link>
        </div>
      </section>

      <div className="quick-jump">
        <div className="container quick-jump-inner">
          <Link to="/explore" className="quick-jump-all">
            All
          </Link>
          {jumpList.map((cat) => (
            <Link key={cat.name} to={`/categories/${cat.name.toLowerCase()}`}>
              {cat.name} <span className="mono muted">{cat.count}</span>
            </Link>
          ))}
          <select className="quick-jump-sort" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort categories">
            <option value="explored">Sort: Most explored</option>
            <option value="name">Sort: A–Z</option>
          </select>
        </div>
      </div>

      <section className="container category-bento">
        <CategoryTile category={find('Landscape')} size="large" topTag="Your top category" />
        <CategoryTile category={find('Abstract')} size="tall" />
        <CategoryTile category={find('Flower')} size="normal" />
        <CategoryTile category={find('Nature')} size="normal" />
        <CategoryTile category={find('Figurative')} size="normal" />
        <CategoryTile category={find('Religious')} size="wide" />
      </section>

      <section className="section section-surface">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Go deeper</p>
              <h2>
                Explore by <span className="accent">style.</span>
              </h2>
            </div>
            <Link to="/explore" className="link-arrow">
              All styles <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          <div className="style-grid">
            {styleExamples.map((style) => {
              const art = getArtwork(style.artworkId);
              const count = artworks.filter((a) => a.style === style.name).length;
              return (
                <Link to="/explore" key={style.name} className="style-card">
                  <img src={art.image} alt={style.name} loading="lazy" />
                  <h4>{style.name}</h4>
                  <p className="mono muted">{count} works</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </PageLayout>
  );
}

export default Categories;
