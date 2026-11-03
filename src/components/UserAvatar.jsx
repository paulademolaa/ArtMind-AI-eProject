import { initialsOf } from '../context/AuthContext';

function UserAvatar({ user, className }) {
  if (user.photo) {
    return <img src={user.photo} alt={user.name} className={`${className} avatar-photo`} />;
  }
  return <span className={className}>{initialsOf(user.name)}</span>;
}

export default UserAvatar;
