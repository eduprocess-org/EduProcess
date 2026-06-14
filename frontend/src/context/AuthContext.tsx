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

<<<<<<< HEAD
  // 🔥 SAFE PARSE (evita romper app si localStorage está corrupto)
=======
  // SAFE PARSE 
>>>>>>> develop
  const safeParseUser = (value: string | null): User | null => {
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

<<<<<<< HEAD
  // 🔥 HYDRATION + SYNC INICIAL
=======
  // HYDRATION + SYNC INICIAL
>>>>>>> develop
  useEffect(() => {
    const storedUser = safeParseUser(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("sessionToken");

    setUser(storedUser);
    setToken(storedToken);

    setLoading(false);
  }, []);

<<<<<<< HEAD
  // 🔥 SYNC ENTRE PESTAÑAS (IMPORTANTE EN PROYECTOS REALES)
=======
  //  SYNC ENTRE PESTAÑAS 
>>>>>>> develop
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

<<<<<<< HEAD
  // 🔐 LOGIN
=======
  // LOGIN
>>>>>>> develop
  const login = (userData: User, sessionToken: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("sessionToken", sessionToken);

    setUser(userData);
    setToken(sessionToken);
  };

<<<<<<< HEAD
  // 🚪 LOGOUT (FORZADO LIMPIO)
=======
  // LOGOUT 
>>>>>>> develop
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setToken(null);

<<<<<<< HEAD
    // opcional pero útil en apps reales
=======
>>>>>>> develop
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