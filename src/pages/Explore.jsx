import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import artworks from '../data/artworks';
import './Explore.css';

const categoryOptions = ['All', 'Abstract', 'Landscape', 'Flower', 'Nature', 'Figurative', 'Religious'];

const styleOptions = [...new Set(artworks.map((art) => art.style))].sort();
const surfaceOptions = [...new Set(artworks.map((art) => art.surface))].sort();
const mediumOptions = ['Oil', 'Tempera'];

const colourOptions = [
  { name: 'Blue', hex: '#2F5D9B' },
  { name: 'Green', hex: '#5C8054' },
  { name: 'Ochre', hex: '#B38C66' },
  { name: 'Red', hex: '#B24A3A' },
  { name: 'Cream', hex: '#EDE6D6' },
  { name: 'Black', hex: '#1D1D1D' },
  { name: 'Grey', hex: '#8C9299' },
  { name: 'Pink', hex: '#C09E99' },
];

const trendingIds = ['water-lily-pond', 'cliff-walk-at-pourville', 'la-grande-jatte-oil-sketch', 'the-childs-bath', 'improvisation-no-30', 'view-of-cotopaxi'];
const mostSavedIds = ['water-lily-pond', 'two-sisters-on-the-terrace', 'the-herring-net', 'chrysanthemums', 'magnolias-on-blue-velvet'];
const popularityOptions = ['Trending this week', 'Most saved'];

function colourDistance(hexA, hexB) {
  const a = [1, 3, 5].map((i) => parseInt(hexA.slice(i, i + 2), 16));
  const b = [1, 3, 5].map((i) => parseInt(hexB.slice(i, i + 2), 16));
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

function hasColour(art, colourName) {
  const swatch = colourOptions.find((colour) => colour.name === colourName);
  return art.palette.slice(0, 3).some((hex) => colourDistance(hex, swatch.hex) < 70);
}

function FilterGroup({ title, options, selected, onToggle, count }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="filter-group">
      <button className="filter-title" onClick={() => setOpen(!open)} aria-expanded={open}>
        {title}
        <Icon name="chevronDown" size={16} className={open ? 'chevron open' : 'chevron'} />
      </button>
      {open &&
        options.map((option) => (
          <label key={option} className="checkbox">
            <input type="checkbox" checked={selected.includes(option)} onChange={() => onToggle(option)} />
            <span>{option}</span>
            <span className="checkbox-count">{count(option)}</span>
          </label>
        ))}
    </div>
  );
}

function Explore() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [styles, setStyles] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [colours, setColours] = useState([]);
  const [popularity, setPopularity] = useState([]);
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('relevant');
  const [visibleCount, setVisibleCount] = useState(12);
  const [filtersOpen, setFiltersOpen] = useState(false);

  function toggle(list, setList, value) {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  }

  function clearAll() {
    setSearch('');
    setCategory('All');
    setStyles([]);
    setSurfaces([]);
    setMediums([]);
    setColours([]);
    setPopularity([]);
  }

  let results = artworks.filter((art) => {
    const text = (art.title + ' ' + art.artist + ' ' + art.style).toLowerCase();
    if (search && !text.includes(search.toLowerCase())) return false;
    if (category !== 'All' && art.category !== category) return false;
    if (styles.length > 0 && !styles.includes(art.style)) return false;
    if (surfaces.length > 0 && !surfaces.includes(art.surface)) return false;
    if (mediums.length > 0 && !mediums.some((m) => art.medium.includes(m))) return false;
    if (colours.length > 0 && !colours.some((colour) => hasColour(art, colour))) return false;
    if (popularity.includes('Trending this week') && !trendingIds.includes(art.id)) return false;
    if (popularity.includes('Most saved') && !mostSavedIds.includes(art.id)) return false;
    return true;
  });

  if (sort === 'title') {
    results = [...results].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'artist') {
    results = [...results].sort((a, b) => a.artist.localeCompare(b.artist));
  } else if (sort === 'oldest') {
    results = [...results].sort((a, b) => parseInt(a.date.replace(/\D/g, '').slice(0, 4)) - parseInt(b.date.replace(/\D/g, '').slice(0, 4)));
  }

  const activeFilters = [
    ...styles.map((value) => ({ value, remove: () => toggle(styles, setStyles, value) })),
    ...surfaces.map((value) => ({ value, remove: () => toggle(surfaces, setSurfaces, value) })),
    ...mediums.map((value) => ({ value, remove: () => toggle(mediums, setMediums, value) })),
    ...colours.map((value) => ({ value, remove: () => toggle(colours, setColours, value) })),
    ...popularity.map((value) => ({ value, remove: () => toggle(popularity, setPopularity, value) })),
  ];

  return (
    <PageLayout>
      <section className="page-header container">
        <p className="breadcrumb">Home / Explore Art</p>
        <div className="page-header-row">
          <div>
            <h1>Explore Art</h1>
            <p className="lead">
              Paintings tagged by AI for style, medium, surface and palette. Filter freely — or describe what you’re
              looking for in Smart Search.
            </p>
          </div>
          <div className="search-input">
            <Icon name="search" />
            <input
              type="search"
              placeholder="Search artworks, artists, styles…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search artworks"
            />
          </div>
        </div>

        <div className="category-tabs">
          {categoryOptions.map((option) => (
            <button key={option} className={category === option ? 'chip active' : 'chip'} onClick={() => setCategory(option)}>
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="container explore-body">
        <aside className={filtersOpen ? 'filters open' : 'filters'}>
          <div className="filters-header">
            <h4>
              <Icon name="filter" size={18} /> Filters
            </h4>
            <button className="text-button" onClick={clearAll}>
              Clear all
            </button>
            <button className="filters-close" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
              <Icon name="close" />
            </button>
          </div>

          <FilterGroup
            title="Artistic style"
            options={styleOptions}
            selected={styles}
            onToggle={(value) => toggle(styles, setStyles, value)}
            count={(value) => artworks.filter((art) => art.style === value).length}
          />
          <FilterGroup
            title="Surface material"
            options={surfaceOptions}
            selected={surfaces}
            onToggle={(value) => toggle(surfaces, setSurfaces, value)}
            count={(value) => artworks.filter((art) => art.surface === value).length}
          />
          <FilterGroup
            title="Color medium"
            options={mediumOptions}
            selected={mediums}
            onToggle={(value) => toggle(mediums, setMediums, value)}
            count={(value) => artworks.filter((art) => art.medium.includes(value)).length}
          />

          <div className="filter-group">
            <p className="filter-title">Dominant colour</p>
            <div className="colour-swatches">
              {colourOptions.map((colour) => (
                <button
                  key={colour.name}
                  className={colours.includes(colour.name) ? 'colour-swatch active' : 'colour-swatch'}
                  style={{ background: colour.hex }}
                  onClick={() => toggle(colours, setColours, colour.name)}
                  aria-label={colour.name}
                  title={colour.name}
                />
              ))}
            </div>
            <p className="muted filter-note">Colours are detected by AI and may not match the painting exactly.</p>
          </div>

          <FilterGroup
            title="Popularity"
            options={popularityOptions}
            selected={popularity}
            onToggle={(value) => toggle(popularity, setPopularity, value)}
            count={(value) => (value === 'Most saved' ? mostSavedIds.length : trendingIds.length)}
          />

          <button className="btn btn-dark filters-apply" onClick={() => setFiltersOpen(false)}>
            Show {results.length} artworks
          </button>
        </aside>

        <div className="results">
          <div className="results-toolbar">
            <div className="results-count">
              <strong>{results.length} artworks</strong>
              {activeFilters.map((filter) => (
                <button key={filter.value} className="chip active" onClick={filter.remove} aria-label={`Remove ${filter.value}`}>
                  {filter.value} <Icon name="close" size={12} />
                </button>
              ))}
            </div>
            <div className="results-actions">
              <button className="btn btn-outline filters-open-button" onClick={() => setFiltersOpen(true)}>
                <Icon name="filter" size={16} /> Filters
              </button>
              <select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort artworks">
                <option value="relevant">Sort: Most relevant</option>
                <option value="title">Title A–Z</option>
                <option value="artist">Artist A–Z</option>
                <option value="oldest">Oldest first</option>
              </select>
              <div className="view-switch">
                <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid view">
                  <Icon name="grid" size={16} />
                </button>
                <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view">
                  <Icon name="menu" size={16} />
                </button>
              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="empty-state">
              <Icon name="search" size={28} />
              <h3>No paintings match these filters</h3>
              <p className="muted">Try removing a filter, or describe what you want in Smart Search.</p>
              <button className="btn btn-dark" onClick={clearAll}>
                Clear filters
              </button>
            </div>
          ) : (
            view === 'grid' ? (
              <div className="results-grid">
                {results.slice(0, visibleCount).map((art) => (
                  <ArtworkCard key={art.id} artwork={art} />
                ))}
              </div>
            ) : (
              <div className="results-list">
                {results.slice(0, visibleCount).map((art) => (
                  <Link key={art.id} to={`/artwork/${art.id}`} className="results-list-item">
                    <img src={art.image} alt="" />
                    <div>
                      <p className="artwork-card-label">
                        {art.category} · {art.date}
                      </p>
                      <h4>{art.title}</h4>
                      <p className="muted small">{art.artist}</p>
                    </div>
                    <span className="muted small">{art.style}</span>
                    <span className="muted small">{art.medium}</span>
                  </Link>
                ))}
              </div>
            )
          )}

          {visibleCount < results.length && (
            <div className="load-more">
              <p className="muted small">
                Showing {visibleCount} of {results.length} artworks
              </p>
              <div className="load-progress">
                <span style={{ width: (visibleCount / results.length) * 100 + '%' }} />
              </div>
              <button className="btn btn-outline" onClick={() => setVisibleCount(visibleCount + 8)}>
                Load more artworks
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

export default Explore;
