// ------------------------------------------------------------
// UserAvatar — the round profile picture.
// Shows the user's photo if they uploaded one (Account Settings),
// otherwise their initials, e.g. "PA".
// Props: user, className (sets the size/colours, e.g. "nav-avatar")
// ------------------------------------------------------------
import { initialsOf } from '../context/AuthContext';

function UserAvatar({ user, className }) {
  if (user.photo) {
    return <img src={user.photo} alt={user.name} className={`${className} avatar-photo`} />;
  }
  return <span className={className}>{initialsOf(user.name)}</span>;
}

export default UserAvatar;
