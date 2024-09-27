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

type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
};

type TokenPayload = {
  userId: number;
  alisonId: number;
  alisonToken: string;
  firstname: string;
  lastname: string;
  iat: number;
  exp: number;
};

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

  const decodeToken = (token: string): TokenPayload | null => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('alisonId');
    localStorage.removeItem('alisonToken');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  }, [router]);

  const refreshAccessToken = useCallback(async () => {
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
  }, [refreshToken]);

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
          setUser({ ...data });
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
    [logout, refreshAccessToken]
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

  const login = useCallback(
    (accessToken: string, refreshToken: string) => {
      const tokenPayload = decodeToken(accessToken);
      setToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('alisonId', tokenPayload?.alisonId.toString() || '');
      localStorage.setItem('alisonToken', tokenPayload?.alisonToken || '');
      setIsAuthenticated(true);
      fetchUserInfo(accessToken);
    },
    [fetchUserInfo]
  );

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
