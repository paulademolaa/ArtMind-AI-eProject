// ------------------------------------------------------------
// PageLayout — wraps a page with the Navbar on top and Footer below.
// Usage:  <PageLayout> ...page content... </PageLayout>
// Use transparentNav on pages with a full-width image at the top.
// ------------------------------------------------------------
import Navbar from './Navbar';
import Footer from './Footer';

function PageLayout({ children, transparentNav = false, hideFooter = false }) {
  return (
    <>
      <Navbar transparent={transparentNav} />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}

export default PageLayout;
