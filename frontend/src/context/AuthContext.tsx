import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
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

  // 🔥 SAFE PARSE (evita romper app si localStorage está corrupto)
  const safeParseUser = (value: string | null): User | null => {
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  // 🔥 HYDRATION + SYNC INICIAL
  useEffect(() => {
    const storedUser = safeParseUser(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("sessionToken");

    setUser(storedUser);
    setToken(storedToken);

    setLoading(false);
  }, []);

  // 🔥 SYNC ENTRE PESTAÑAS (IMPORTANTE EN PROYECTOS REALES)
  useEffect(() => {
    const syncAuth = () => {
      const storedUser = safeParseUser(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("sessionToken");

      setUser(storedUser);
      setToken(storedToken);
    };

    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  // 🔐 LOGIN
  const login = (userData: User, sessionToken: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("sessionToken", sessionToken);

    setUser(userData);
    setToken(sessionToken);
  };

  // 🚪 LOGOUT (FORZADO LIMPIO)
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setToken(null);

    // opcional pero útil en apps reales
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}