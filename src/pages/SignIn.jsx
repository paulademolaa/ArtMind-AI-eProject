import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import PasswordInput from '../components/PasswordInput';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const goTo = location.state?.from || '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = {};
    if (!email.includes('@') || !email.includes('.')) newErrors.email = 'Enter a valid email address, e.g. name@domain.com';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const problem = signIn(email, password, keepSignedIn);
      if (problem) {
        setErrors({ form: problem });
      } else {
        navigate(goTo);
      }
    }
  }

  return (
    <AuthLayout artworkId="interrupted-reading" quote="“Every painting you save teaches ArtMind a little more about you.”">
      <h1>Welcome back</h1>
      <p className="muted">Sign in to see your favourites and personalised picks.</p>

      <form onSubmit={handleSubmit} noValidate>
        {errors.form && <p className="auth-alert">{errors.form}</p>}
        <label className="field">
          Email address
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <div className="field">
          Password
          <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} />
          {errors.password ? <span className="error">{errors.password}</span> : <span className="field-hint">At least 8 characters.</span>}
        </div>

        <div className="auth-row">
          <label>
            <input type="checkbox" checked={keepSignedIn} onChange={() => setKeepSignedIn(!keepSignedIn)} /> Keep me signed in
          </label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button type="submit" className="btn btn-dark">
          Sign in <Icon name="arrowRight" size={14} />
        </button>
      </form>

      <div className="auth-divider">
        <span>Optional · future integration</span>
      </div>
      <button type="button" className="btn btn-outline auth-google" disabled>
        Continue with Google
      </button>

      <p className="auth-switch">
        New to ArtMind? <Link to="/signup" state={location.state}>Create an account</Link>
      </p>
    </AuthLayout>
  );
}

export default SignIn;
