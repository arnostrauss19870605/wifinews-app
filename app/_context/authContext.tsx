'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  alisonId?: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const decodeToken = (token: string): string | null => {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.alisonId || null;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  const fetchUserInfo = useCallback(
    async (accessToken: string) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();

        if (res.ok) {
          const alisonId = decodeToken(accessToken);
          localStorage.setItem('alisonId', alisonId || '');
          setUser({ ...data, alisonId });
        } else if (res.status === 401) {
          const success = await refreshAccessToken();
          if (!success) {
            logout();
          }
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
        logout();
      }
    },
    [refreshToken]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedToken && storedRefreshToken) {
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
      setIsAuthenticated(true);
      fetchUserInfo(storedToken);
    }
  }, [fetchUserInfo]);

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        }
      );

      const data = await res.json();
      if (res.ok && data.access_token) {
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);
        return true;
      } else {
        console.error('Failed to refresh access token');
        return false;
      }
    } catch (err) {
      console.error('Error refreshing token:', err);
      return false;
    }
  };

  const login = (accessToken: string, refreshToken: string) => {
    const alisonId = decodeToken(accessToken);
    setToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('alisonId', alisonId || '');
    setIsAuthenticated(true);
    fetchUserInfo(accessToken);
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('alisonId');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
