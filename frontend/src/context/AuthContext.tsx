import {
  createContext,
  useEffect,
  useState,
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
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: Props) {

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    const storedToken =
      localStorage.getItem("sessionToken");

    if (storedUser && storedToken) {

      setUser(JSON.parse(storedUser));
      setToken(storedToken);

    }

  }, []);

  const login = (
    userData: User,
    sessionToken: string
  ) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "sessionToken",
      sessionToken
    );

    setUser(userData);
    setToken(sessionToken);

  };

  const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setToken(null);

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}