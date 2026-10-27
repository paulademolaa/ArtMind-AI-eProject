// ------------------------------------------------------------
// AI Smart Search — /ai/search?q=...
// The user types a sentence. We "understand" it with smartSearch()
// from utils/fakeAI.js and show: intent chips + matching artworks.
// States: empty → loading → results (or no results)
// Layout follows Figma: removable intent chips, "Refine with AI" chips,
// masonry results with sorting, and "People who searched this also explored".
// ------------------------------------------------------------
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import artworks from '../data/artworks';
import { smartSearch } from '../utils/fakeAI';
import './SmartSearch.css';

const suggestions = [
  'Show oil paintings with nature themes',
  'Find watercolor landscape paintings',
  'Modern abstract paintings on canvas',
  'Flowers in a dark, Dutch style',
  'Quiet paintings of women reading',
  'Golden Renaissance panels',
];

// Extra words you can add to (or remove from) your search with one click.
const refineOptions = ['Golden hour', 'Water', 'Mountains', 'On canvas', '19th century', 'Large scale'];

// Does the text contain this word/phrase? (ignores upper/lower case)
const containsWord = (text, word) => text.toLowerCase().includes(word.toLowerCase());
// Remove a word/phrase from the text and tidy up the spaces.
const removeWord = (text, word) =>
  text
    .replace(new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + 's?', 'ig'), '')
    .replace(/\s+/g, ' ')
    .trim();

function SmartSearch() {
  // The search text lives in the address bar (?q=...) so it can be shared.
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [input, setInput] = useState(query);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { intent, results }
  const [history, setHistory] = useState(['Calm blue seascapes', 'Renaissance angels with gold', 'Modern abstract paintings on canvas']);
  const [sort, setSort] = useState('relevant');
  const inputRef = useRef(null); // used by the "Edit" button

  // Whenever the query in the address changes, run the search.
  useEffect(() => {
    setInput(query);
    if (!query) {
      setResult(null);
      return;
    }
    setLoading(true);
    // Wait a moment to feel like the AI is "thinking".
    const timer = setTimeout(() => {
      setResult(smartSearch(query));
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer); // cancel if the user searches again quickly
  }, [query]);

  function runSearch(text) {
    if (!text.trim()) return;
    setSearchParams({ q: text });
    if (!history.includes(text)) setHistory([text, ...history].slice(0, 5));
  }

  // Remove one understood part, e.g. "Medium: Oil" removes "oil" from the search.
  function removeIntent(item) {
    const word = item.split(': ')[1];
    const newQuery = removeWord(query, word);
    if (newQuery) runSearch(newQuery);
  }

  // Add or remove a "Refine with AI" word.
  function toggleRefine(word) {
    runSearch(containsWord(query, word) ? removeWord(query, word) || query : `${query} ${word.toLowerCase()}`);
  }

  // Sort the results (they come "most relevant first").
  const year = (art) => parseInt(art.date.match(/\d{4}/)[0]);
  let shown = result ? result.results : [];
  if (sort === 'oldest') shown = [...shown].sort((a, b) => year(a) - year(b));
  if (sort === 'newest') shown = [...shown].sort((a, b) => year(b) - year(a));

  // "People who searched this also explored": paintings not in the results.
  const alsoExplored = artworks.filter((art) => !shown.some((item) => item.id === art.id)).slice(0, 4);

  function handleSubmit(event) {
    event.preventDefault();
    runSearch(input);
  }

  return (
    <PageLayout>
      <section className="container search-hero">
        <p className="eyebrow search-eyebrow">
          <Icon name="sparkle" size={14} /> AI Smart Search
        </p>
        <h1>{query ? 'Describe it. We’ll find it.' : 'What would you like to see?'}</h1>
        <form className="search-bar search-bar-bordered" onSubmit={handleSubmit}>
          <Icon name="sparkle" className="search-bar-icon" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="e.g. Show oil paintings with nature themes"
            aria-label="Describe the art you want to find"
          />
          <button type="submit" className="btn btn-dark">
            Search <Icon name="arrowRight" size={14} />
          </button>
        </form>

        {/* What the AI understood */}
        {result && result.intent.length > 0 && (
          <div className="intent">
            <p className="intent-label">
              <Icon name="sparkle" size={14} className="spark" /> Here’s how ArtMind understood your search
            </p>
            <div className="intent-chips">
              {result.intent.map((item) => (
                <button key={item} className="chip active" onClick={() => removeIntent(item)} aria-label={`Remove ${item}`}>
                  {item} <Icon name="close" size={12} />
                </button>
              ))}
              <button className="text-button" onClick={() => inputRef.current.focus()}>
                Edit
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="container search-body">
        {/* ---- Sidebar: history + suggestions ---- */}
        <aside className="search-side">
          <div className="side-title-row">
            <h4 className="side-title">Recent searches</h4>
            {history.length > 0 && (
              <button className="text-button" onClick={() => setHistory([])}>
                Clear
              </button>
            )}
          </div>
          <ul className="history">
            {history.map((item) => (
              <li key={item}>
                <button onClick={() => runSearch(item)}>
                  <Icon name="clock" size={16} /> {item}
                </button>
              </li>
            ))}
          </ul>
          {query && (
            <>
              <h4 className="side-title">
                <Icon name="sparkle" size={12} /> Refine with AI
              </h4>
              <div className="side-chips refine-chips">
                {refineOptions.map((word) => (
                  <button key={word} className={containsWord(query, word) ? 'chip active' : 'chip'} onClick={() => toggleRefine(word)}>
                    {word}
                  </button>
                ))}
              </div>
            </>
          )}

          <h4 className="side-title">Try asking</h4>
          <div className="try-asking">
            {['Only Impressionist painters', 'More dramatic skies', 'Calm paintings of women reading'].map((item) => (
              <button key={item} onClick={() => runSearch(item)}>
                “{item}”
              </button>
            ))}
          </div>
        </aside>

        {/* ---- Main area: one of four states ---- */}
        <div className="search-main">
          {/* 1. Empty state: nothing searched yet */}
          {!query && (
            <div>
              <h4 className="side-title">Suggested searches</h4>
              <div className="suggestion-grid">
                {suggestions.map((item) => (
                  <button key={item} className="suggestion-card" onClick={() => runSearch(item)}>
                    <Icon name="sparkle" size={16} /> {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Loading state */}
          {query && loading && (
            <div>
              <div className="ai-progress">
                <p>
                  <Icon name="sparkle" size={16} /> Understanding “{query}”…
                </p>
                <div className="ai-progress-bar">
                  <span />
                </div>
              </div>
              <div className="results-grid-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="skeleton" />
                ))}
              </div>
            </div>
          )}

          {/* 3. Results */}
          {query && !loading && result && result.results.length > 0 && (
            <>
              <div className="results-title">
                <div>
                  <h3>{result.results.length} paintings match</h3>
                  <p className="mono muted">Ranked by relevance to your description</p>
                </div>
                <select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort results">
                  <option value="relevant">Sort: Most relevant</option>
                  <option value="oldest">Oldest first</option>
                  <option value="newest">Newest first</option>
                </select>
              </div>
              <div className="results-grid-3">
                {shown.map((art) => (
                  <ArtworkCard key={art.id} artwork={art} tag={art.match + ' match'} />
                ))}
              </div>
            </>
          )}

          {/* 4. No results */}
          {query && !loading && result && result.results.length === 0 && (
            <div className="no-results">
              <Icon name="search" size={28} />
              <h3>No paintings match “{query}”</h3>
              <p className="muted">Try a broader style or medium, or one of these:</p>
              <div className="side-chips">
                {suggestions.slice(0, 3).map((item) => (
                  <button key={item} className="chip" onClick={() => runSearch(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---- People who searched this also explored ---- */}
      {query && !loading && result && (
        <section className="section section-surface">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">Related</p>
                <h2>People who searched this also explored</h2>
              </div>
            </div>
            <div className="grid-4">
              {alsoExplored.map((art) => (
                <ArtworkCard key={art.id} artwork={art} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}

export default SmartSearch;
