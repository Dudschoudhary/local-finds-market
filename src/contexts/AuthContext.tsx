import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'localmart_user';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

type User = { id: string; name?: string; contactNumber?: string; token?: string } | null;

type AuthContextValue = {
  user: User;
  checking: boolean;
  checkUser: (contactNumber: string) => Promise<{ exists: boolean; user: User | null }>;
  register: (payload: { name: string; contactNumber: string; password: string }) => Promise<User>;
  login: (payload: { contactNumber: string; password: string }) => Promise<User>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {
        setUser(null);
      }
    }
    setChecking(false);
  }, []);

  const persist = (u: User) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const checkUser = async (contactNumber: string) => {
    const res = await fetch(`${API_BASE}/api/auth/check?contactNumber=${encodeURIComponent(contactNumber)}`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Failed to check user');
    }
    const data = await res.json();
    return data as { exists: boolean; user: User | null };
  };

  const register = async (payload: { name: string; contactNumber: string; password: string }) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Register failed');
    const data = await res.json();
    const u: User = { id: data.user.id, name: data.user.name, contactNumber: data.user.contactNumber, token: data.token };
    persist(u);
    return u;
  };

  const login = async (payload: { contactNumber: string; password: string }) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
    const data = await res.json();
    const u: User = { id: data.user.id, name: data.user.name, contactNumber: data.user.contactNumber, token: data.token };
    persist(u);
    return u;
  };

  const logout = () => {
    persist(null);
  };

  return (
    <AuthContext.Provider value={{ user, checking, checkUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
