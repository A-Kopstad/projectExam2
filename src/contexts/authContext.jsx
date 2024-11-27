import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('avatar') || null);

  const login = (token, name, avatar) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('username', name);
    localStorage.setItem('avatar', avatar);
    setAccessToken(token);
    setUsername(name);
    setAvatarUrl(avatar);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    setAccessToken(null);
    setUsername(null);
    setAvatarUrl(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, username, avatarUrl, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
