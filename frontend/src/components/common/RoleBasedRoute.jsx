import { Navigate } from 'react-router-dom';

function RoleBasedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');

  let role = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      role = payload.role?.toLowerCase();
    } catch {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default RoleBasedRoute;
