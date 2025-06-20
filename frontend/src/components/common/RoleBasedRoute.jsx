import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function RoleBasedRoute({ children, allowedRoles }) {
  const { auth } = useContext(AuthContext);

  if (!auth.user) return <Navigate to="/login" />;

  return allowedRoles.includes(auth.user.role)
    ? children
    : <Navigate to="/unauthorized" />;
}

export default RoleBasedRoute;
