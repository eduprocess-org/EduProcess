import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { isTokenValid } from "../utils/tokenValidator";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  career?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  initialized: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const safeParseUser = (value: string | null): User | null => {
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  const clearAuth = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setToken(null);
  }, []);

  // HYDRATION INICIAL - Validación de token
  useEffect(() => {
    try {
      const storedUser = safeParseUser(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("sessionToken");

      if (storedToken && isTokenValid(storedToken) && storedUser) {
        setUser(storedUser);
        setToken(storedToken);
      } else {
        clearAuth();
      }
    } catch {
      clearAuth();
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, [clearAuth]);

  // SYNC ENTRE PESTAÑAS
  useEffect(() => {
    const syncAuth = () => {
      const storedUser = safeParseUser(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("sessionToken");

      if (storedToken && isTokenValid(storedToken) && storedUser) {
        setUser(storedUser);
        setToken(storedToken);
      } else {
        clearAuth();
      }
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, [clearAuth]);

  // LOGIN
  const login = useCallback((userData: User, sessionToken: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("sessionToken", sessionToken);
    setUser(userData);
    setToken(sessionToken);
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        initialized,
        isAuthenticated: !!user && !!token && isTokenValid(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}