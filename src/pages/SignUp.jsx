// ------------------------------------------------------------
// Sign Up — /signup
// Checks each field and shows a password-strength bar.
// ------------------------------------------------------------
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import PasswordInput from '../components/PasswordInput';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

// Give the password a score from 0 to 4.
function passwordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuth();
  // Where to go after signing up (the page they wanted, or the dashboard)
  const goTo = location.state?.from || '/dashboard';
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.email.includes('@') || !form.email.includes('.')) newErrors.email = 'Enter a valid email address.';
    if (form.password.length < 8) newErrors.password = 'Use at least 8 characters.';
    if (!agreed) newErrors.agreed = 'Please accept the terms to continue.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const problem = signUp(form.name, form.email, form.password);
      if (problem) {
        setErrors({ form: problem });
      } else {
        navigate(goTo);
      }
    }
  }

  const strength = passwordStrength(form.password);

  return (
    <AuthLayout artworkId="the-annunciation" quote="“A personal museum that grows with your curiosity.”">
      <h1>Create your account</h1>
      <p className="muted">Free forever. Save paintings, build collections and get AI recommendations.</p>

      {/* Shown when a visitor tried to open a page that needs an account */}
      {location.state?.needsAccount && (
        <p className="auth-notice">
          Create a free account to see your dashboard and saved paintings. Already have one?{' '}
          <Link to="/signin" state={location.state}>Sign in</Link>
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {errors.form && <p className="auth-alert">{errors.form}</p>}
        <label className="field">
          Full name
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label className="field">
          Email address
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <div className="field">
          Password
          <PasswordInput value={form.password} onChange={handleChange} placeholder="At least 8 characters" />
          {/* Strength bar: 4 small bars, filled up to the score */}
          {form.password && (
            <div>
              <div className="strength">
                {[1, 2, 3, 4].map((level) => (
                  <span key={level} className={strength >= level ? 'on' : ''} />
                ))}
              </div>
              <small className="muted">{strengthLabels[strength]}</small>
            </div>
          )}
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <label className="auth-row" style={{ justifyContent: 'flex-start', gap: 8 }}>
          <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} /> I agree to the Terms of Use and Privacy Policy
        </label>
        {errors.agreed && <span className="field"><span className="error">{errors.agreed}</span></span>}

        <button type="submit" className="btn btn-dark">
          Create account <Icon name="arrowRight" size={14} />
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/signin" state={location.state}>Sign in</Link>
      </p>
    </AuthLayout>
  );
}

export default SignUp;
