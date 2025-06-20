import { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      const user = userString && userString !== 'undefined' ? JSON.parse(userString) : null;

      if (token && user) {
        setAuth({ user, token });
      }
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, []);

  // Function to handle login: save user and token
  const login = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setAuth({ user, token });
  };

  // Function to handle logout: clear storage and reset auth
  const logout = () => {
    localStorage.clear();
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
