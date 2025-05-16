import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginApi } from '../services/api';

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginApi(email, password);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', email);
      setUser(email);
      setToken(data.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Ошибка:', error);
      throw error;
    }
  };

  const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUser(null);
  setToken(null);
  setIsAuthenticated(false);
};

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};
