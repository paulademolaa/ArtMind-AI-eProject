// ------------------------------------------------------------
// PasswordInput — a password box with a "show / hide" eye button.
// ------------------------------------------------------------
import { useState } from 'react';
import Icon from './Icon';

function PasswordInput({ value, onChange, placeholder = 'Enter your password', name = 'password' }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-box">
      <input type={visible ? 'text' : 'password'} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      <button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? 'Hide password' : 'Show password'}>
        <Icon name="eye" size={18} />
      </button>
    </div>
  );
}

export default PasswordInput;
