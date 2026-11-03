import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ArtworkCard from '../components/ArtworkCard';
import { getArtwork, getByCategory } from '../data/artworks';
import { categories } from '../data/siteData';
import './Explore.css';
import './CategoryDetail.css';

function CategoryDetail() {
  const { name } = useParams();
  const [style, setStyle] = useState('All styles');
  const [sort, setSort] = useState('relevant');

  const category = categories.find((cat) => cat.name.toLowerCase() === name);

  if (!category) {
    return (
      <PageLayout>
        <div className="container" style={{ padding: '120px 0' }}>
          <h1>Category not found</h1>
          <Link to="/categories" className="btn btn-dark" style={{ marginTop: 24 }}>
            See all categories
          </Link>
        </div>
      </PageLayout>
    );
  }

  const allInCategory = getByCategory(category.name);
  const styles = ['All styles', ...new Set(allInCategory.map((art) => art.style))];
  let shown = style === 'All styles' ? allInCategory : allInCategory.filter((art) => art.style === style);
  const year = (art) => parseInt(art.date.match(/\d{4}/)[0]);
  if (sort === 'oldest') shown = [...shown].sort((a, b) => year(a) - year(b));
  if (sort === 'newest') shown = [...shown].sort((a, b) => year(b) - year(a));
  if (sort === 'title') shown = [...shown].sort((a, b) => a.title.localeCompare(b.title));
  const cover = getArtwork(category.coverId);

  return (
    <PageLayout>
      <section className="category-banner" style={{ backgroundImage: `url(${cover.image})` }}>
        <div className="category-banner-shade" />
        <div className="container category-banner-text">
          <p className="breadcrumb">
            <Link to="/categories">Categories</Link> / {category.name}
          </p>
          <h1 className="display">{category.name} Paintings</h1>
          <p>
            {category.count} artworks · {category.description}
          </p>
        </div>
      </section>

      <div className="container style-chips">
        <div className="style-chips-list">
          {styles.map((option) => (
            <button key={option} className={style === option ? 'chip active' : 'chip'} onClick={() => setStyle(option)}>
              {option}
            </button>
          ))}
        </div>
        <select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort artworks">
          <option value="relevant">Sort: Most relevant</option>
          <option value="oldest">Oldest first</option>
          <option value="newest">Newest first</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      <section className="container category-results">
        <div className="results-grid category-grid-4">
          {shown.map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
        <div className="load-more">
          <p className="muted small mono">
            Showing {shown.length} of {allInCategory.length} artworks in this sample collection
          </p>
          <div className="load-progress">
            <span style={{ width: (shown.length / allInCategory.length) * 100 + '%' }} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default CategoryDetail;
