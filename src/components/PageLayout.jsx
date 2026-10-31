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
