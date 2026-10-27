// ------------------------------------------------------------
// App — lists every page and its address (route).
// To add a page: import it, then add a <Route path="..." element={...} />
// ------------------------------------------------------------
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import ScrollToTop from './components/ScrollToTop';

// Public pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import ArtworkDetails from './pages/ArtworkDetails';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import About from './pages/About';

// AI pages
import SmartSearch from './pages/SmartSearch';
import ImageRecognition from './pages/ImageRecognition';
import Recommendations from './pages/Recommendations';
import Assistant from './pages/Assistant';

// Signed-in pages
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';

// Account pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/artwork/:id" element={<ArtworkDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:name" element={<CategoryDetail />} />
          <Route path="/about" element={<About />} />

          <Route path="/ai/search" element={<SmartSearch />} />
          <Route path="/ai/recognition" element={<ImageRecognition />} />
          <Route path="/ai/recommendations" element={<Recommendations />} />
          <Route path="/ai/assistant" element={<Assistant />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Any other address shows the "page not found" screen */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
