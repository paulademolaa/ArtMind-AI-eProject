// ------------------------------------------------------------
// App — lists every page and its address (route).
// To add a page: import it, then add a <Route path="..." element={...} />
// ------------------------------------------------------------
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
import ScrollToTop from './components/ScrollToTop';
import ScrollAnimations from './components/ScrollAnimations';

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
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import RecentlyViewed from './pages/RecentlyViewed';
import Settings from './pages/Settings';

// Account pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
    <FavoritesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ScrollAnimations />
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

          {/* These pages need an account — visitors are asked to sign up */}
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/favorites" element={<RequireAuth><Favorites /></RequireAuth>} />
          <Route path="/collections" element={<RequireAuth><Collections /></RequireAuth>} />
          <Route path="/collections/:id" element={<RequireAuth><CollectionDetail /></RequireAuth>} />
          <Route path="/recently-viewed" element={<RequireAuth><RecentlyViewed /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Any other address shows the "page not found" screen */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
