// ------------------------------------------------------------
// Forgot Password — /forgot-password
// After a valid email, we show a confirmation message.
// ------------------------------------------------------------
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Icon from '../components/Icon';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError('Enter the email address you signed up with.');
      return;
    }
    setError('');
    setSent(true);
  }

  return (
    <AuthLayout artworkId="home-of-the-heron" quote="“We’ll get you back to the gallery in a moment.”">
      <Link to="/signin" className="link-arrow">
        <Icon name="arrowLeft" size={14} /> Back to sign in
      </Link>
      <h1 style={{ marginTop: 24 }}>Forgot your password?</h1>
      <p className="muted">Enter the email you signed up with and we’ll send a reset link.</p>

      <form onSubmit={handleSubmit} noValidate>
        <label className="field">
          Email address
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          {error && <span className="error">{error}</span>}
        </label>
        <button type="submit" className="btn btn-dark">
          Send reset link <Icon name="arrowRight" size={14} />
        </button>
        {sent && (
          <p className="success-box">
            <Icon name="check" size={18} /> If an account exists for {email}, a reset link is on its way. It expires in 30 minutes.
          </p>
        )}
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;
