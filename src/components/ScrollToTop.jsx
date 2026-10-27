// ------------------------------------------------------------
// ScrollToTop — when you move to a new page, start at the top.
// (Without this, React Router keeps the old scroll position.)
// ------------------------------------------------------------
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // this component shows nothing on screen
}

export default ScrollToTop;
