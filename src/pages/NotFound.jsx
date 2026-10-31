import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

function NotFound() {
  return (
    <PageLayout>
      <section className="container" style={{ padding: '120px 0' }}>
        <p className="eyebrow">Error 404</p>
        <h1 className="display">
          This page is <span className="accent">missing.</span>
        </h1>
        <p className="lead" style={{ margin: '20px 0 32px' }}>
          Like a painting on loan, it isn’t here right now.
        </p>
        <Link to="/" className="btn btn-dark">
          Back to home
        </Link>
      </section>
    </PageLayout>
  );
}

export default NotFound;
