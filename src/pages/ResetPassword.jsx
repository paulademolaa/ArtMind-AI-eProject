import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import PasswordInput from '../components/PasswordInput';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

function ResetPassword() {
  const { resetPassword } = useAuth();
  const email = sessionStorage.getItem('artmind-reset-email') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = {};
    if (password.length < 8) newErrors.password = 'Use at least 8 characters.';
    if (confirm !== password) newErrors.confirm = 'Passwords don’t match';
    if (!email) newErrors.form = 'Please request a reset link first.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const problem = resetPassword(email, password);
    if (problem) return setErrors({ form: problem });
    sessionStorage.removeItem('artmind-reset-email');
    setDone(true);
  }

  return (
    <AuthLayout artworkId="magnolias-on-blue-velvet" quote="“A fresh start, and the gallery is still here.”">
      <h1>Set a new password</h1>
      <p className="muted">Choose something you haven’t used before.</p>

      {done ? (
        <>
          <p className="success-box">
            <Icon name="check" size={18} /> Your password has been updated.
          </p>
          <Link to="/signin" className="btn btn-dark">
            Sign in <Icon name="arrowRight" size={14} />
          </Link>
        </>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {errors.form && (
            <p className="auth-alert">
              {errors.form} <Link to="/forgot-password">Request a link</Link>
            </p>
          )}
          <div className="field">
            New password
            <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="field">
            Confirm new password
            <PasswordInput value={confirm} onChange={(event) => setConfirm(event.target.value)} />
            {errors.confirm && (
              <span className="error">
                <Icon name="alert" size={14} /> {errors.confirm}
              </span>
            )}
          </div>
          <button type="submit" className="btn btn-dark">
            Update password <Icon name="arrowRight" size={14} />
          </button>
        </form>
      )}
    </AuthLayout>
  );
}

export default ResetPassword;
