// ------------------------------------------------------------
// RequireAuth — wraps pages that need an account (Dashboard,
// Favorites). Visitors are sent to Sign Up with a short message,
// and come back to the page they wanted after signing up/in.
// ------------------------------------------------------------
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signup" replace state={{ from: location.pathname, needsAccount: true }} />;
  }
  return children;
}

export default RequireAuth;
