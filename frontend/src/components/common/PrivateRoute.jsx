import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function PrivateRoute({ children, requiredRole }) {
  const { auth } = useContext(AuthContext);

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && auth.user.role !== requiredRole) {
    return <p style={{ color: 'red' }}>Access denied: {requiredRole}s only.</p>;
  }

  return children;
}

export default PrivateRoute;
