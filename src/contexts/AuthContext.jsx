import React, { createContext, useState, useContext } from 'react';
import { logearG } from '../auth/firebase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  // 🔐 Email del admin real (único lugar donde lo seteás)
  const ADMIN_EMAIL = "admin@admin.com";

  const login = (email) => {
    const token = `fake-token-${email}`;
    localStorage.setItem('authToken', token);
    setUser(email);
    setAdmin(email === ADMIN_EMAIL);
  };

  const logearGmail = () => {
    logearG().then((data) => {
      const email = data.email;
      const token = `fake-token-${email}`;
      setUser(email);
      setAdmin(email === ADMIN_EMAIL);
      localStorage.setItem('authToken', token);
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setAdmin(false);
  };

  const verificacionLog = () => {
    const userToken = localStorage.getItem("authToken");
    if (userToken) {
      const email = userToken.replace("fake-token-", "");
      setUser(email);
      setAdmin(email === ADMIN_EMAIL);
    }
  };

  return (
    <AuthContext.Provider value={{ user, admin, login, logout, logearGmail, verificacionLog }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
