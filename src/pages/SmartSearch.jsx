// ------------------------------------------------------------
// AI Smart Search — /ai/search?q=...
// The user types a sentence. We "understand" it with smartSearch()
// from utils/fakeAI.js and show: intent chips + matching artworks.
// States: empty → loading → results (or no results)
// ------------------------------------------------------------
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
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

function SmartSearch() {
  // The search text lives in the address bar (?q=...) so it can be shared.
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [input, setInput] = useState(query);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { intent, results }
  const [history, setHistory] = useState(['Calm blue seascapes', 'Renaissance angels with gold']);

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
            <Icon name="sparkle" size={16} className="spark" />
            <span className="muted small">Understood as:</span>
            {result.intent.map((item) => (
              <span key={item} className="chip active">
                {item}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="container search-body">
        {/* ---- Sidebar: history + suggestions ---- */}
        <aside className="search-side">
          <h4 className="side-title">Recent searches</h4>
          <ul className="history">
            {history.map((item) => (
              <li key={item}>
                <button onClick={() => runSearch(item)}>
                  <Icon name="clock" size={16} /> {item}
                </button>
              </li>
            ))}
          </ul>
          <h4 className="side-title">Try asking</h4>
          <div className="side-chips">
            {suggestions.slice(0, 4).map((item) => (
              <button key={item} className="chip" onClick={() => runSearch(item)}>
                {item}
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
                <h3>{result.results.length} paintings match</h3>
                <p className="mono muted">Ranked by relevance to your description</p>
              </div>
              <div className="results-grid-3">
                {result.results.map((art) => (
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
    </PageLayout>
  );
}

export default SmartSearch;
