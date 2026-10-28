// ------------------------------------------------------------
// PageLayout — wraps a page with the Navbar on top and Footer below.
// Usage:  <PageLayout> ...page content... </PageLayout>
// Use transparentNav on pages with a full-width image at the top.
// Every page also gets the floating AI Assistant button (bottom-right),
// except the full Assistant page itself (hideChat).
// ------------------------------------------------------------
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

function PageLayout({ children, transparentNav = false, hideFooter = false, hideChat = false }) {
  return (
    <>
      <Navbar transparent={transparentNav} />
      <main>{children}</main>
      {!hideFooter && <Footer />}
      {!hideChat && <ChatWidget />}
    </>
  );
}

export default PageLayout;
