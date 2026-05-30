import { createContext, useContext, useState, useEffect } from 'react';
import { verifyAuth } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('adminUserId');
    const password = localStorage.getItem('adminPassword');
    if (userId && password) {
      verifyAuth({ userid: userId, password })
        .then(() => setIsAuthenticated(true))
        .catch(() => {
          localStorage.removeItem('adminUserId');
          localStorage.removeItem('adminPassword');
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginHandler = (userId, password) => {
    localStorage.setItem('adminUserId', userId);
    localStorage.setItem('adminPassword', password);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminUserId');
    localStorage.removeItem('adminPassword');
    setIsAuthenticated(false);
  };

  const getAuthHeaders = () => ({
    userid: localStorage.getItem('adminUserId'),
    password: localStorage.getItem('adminPassword'),
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login: loginHandler, logout, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};
