// ------------------------------------------------------------
// Explore page — the full gallery with search, filters and sorting.
// How filtering works:
//   1. We keep the user's choices in state (search text, category, etc.)
//   2. On every render we run artworks.filter(...) with those choices
//   3. We show only the first `visibleCount` results ("Load more" adds 8)
// ------------------------------------------------------------
import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import artworks from '../data/artworks';
import './Explore.css';

const categoryOptions = ['All', 'Abstract', 'Landscape', 'Flower', 'Nature', 'Figurative', 'Religious'];

// Build the filter lists from the data, so they always match.
const styleOptions = [...new Set(artworks.map((art) => art.style))].sort();
const surfaceOptions = [...new Set(artworks.map((art) => art.surface))].sort();
const mediumOptions = ['Oil', 'Tempera'];

// A group of checkboxes in the filter sidebar.
// Props: title, options (list of names), selected (list), onToggle(name)
function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div className="filter-group">
      <h4 className="filter-title">{title}</h4>
      {options.map((option) => (
        <label key={option} className="checkbox">
          <input type="checkbox" checked={selected.includes(option)} onChange={() => onToggle(option)} />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function Explore() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [styles, setStyles] = useState([]); // e.g. ['Impressionism']
  const [surfaces, setSurfaces] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [sort, setSort] = useState('relevant');
  const [visibleCount, setVisibleCount] = useState(12);
  const [filtersOpen, setFiltersOpen] = useState(false); // mobile filter drawer

  // Add or remove a value from one of the checkbox lists.
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
  }

  // ---- Apply all filters ----
  let results = artworks.filter((art) => {
    const text = (art.title + ' ' + art.artist + ' ' + art.style).toLowerCase();
    if (search && !text.includes(search.toLowerCase())) return false;
    if (category !== 'All' && art.category !== category) return false;
    if (styles.length > 0 && !styles.includes(art.style)) return false;
    if (surfaces.length > 0 && !surfaces.includes(art.surface)) return false;
    if (mediums.length > 0 && !mediums.some((m) => art.medium.includes(m))) return false;
    return true;
  });

  // ---- Sort ----
  if (sort === 'title') {
    results = [...results].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'artist') {
    results = [...results].sort((a, b) => a.artist.localeCompare(b.artist));
  } else if (sort === 'oldest') {
    results = [...results].sort((a, b) => parseInt(a.date.replace(/\D/g, '').slice(0, 4)) - parseInt(b.date.replace(/\D/g, '').slice(0, 4)));
  }

  const activeFilters = [...styles, ...surfaces, ...mediums];

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
        {/* ---- Filter sidebar (becomes a drawer on mobile) ---- */}
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

          <FilterGroup title="Artistic style" options={styleOptions} selected={styles} onToggle={(value) => toggle(styles, setStyles, value)} />
          <FilterGroup title="Surface material" options={surfaceOptions} selected={surfaces} onToggle={(value) => toggle(surfaces, setSurfaces, value)} />
          <FilterGroup title="Color medium" options={mediumOptions} selected={mediums} onToggle={(value) => toggle(mediums, setMediums, value)} />

          <button className="btn btn-dark filters-apply" onClick={() => setFiltersOpen(false)}>
            Show {results.length} artworks
          </button>
        </aside>

        {/* ---- Results ---- */}
        <div className="results">
          <div className="results-toolbar">
            <div className="results-count">
              <strong>{results.length} artworks</strong>
              {activeFilters.map((filter) => (
                <span key={filter} className="chip active">
                  {filter}
                </span>
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
            <div className="results-grid">
              {results.slice(0, visibleCount).map((art) => (
                <ArtworkCard key={art.id} artwork={art} />
              ))}
            </div>
          )}

          {visibleCount < results.length && (
            <div className="load-more">
              <p className="muted small">
                Showing {visibleCount} of {results.length} artworks
              </p>
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
