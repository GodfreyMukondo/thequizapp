import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Navbar() {
  const { auth } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {!auth.user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
