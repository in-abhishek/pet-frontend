import React, { createContext, useContext, useState,  useEffect, type ReactNode } from 'react';
import type { User } from '../utils/AuthUtils';


interface ThemeContextType {
  accessToken: string;
  setAccessToken: (token: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshMyToken = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/refresh-token`,
          {
            method: 'POST',
            credentials: 'include',
          }
        );

        const data = await response.json();

        if (response.ok) {
          setAccessToken(data.accessToken);
          setUser(data.user);
        } else {
          setAccessToken('');
          setUser(null);
        }
      } catch (error) {
        console.error("Refresh failed", error);
      } finally {
        setLoading(false);
      }
    };

    refreshMyToken();
  }, []);


  return (
    <ThemeContext.Provider value={{ accessToken, setAccessToken, setUser, user }}>
      {!loading && children}
    </ThemeContext.Provider>
  );
};

export const useAuth = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
