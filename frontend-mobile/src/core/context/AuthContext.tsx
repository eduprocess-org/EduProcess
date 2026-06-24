// src/core/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authStorage } from '../storage/authStorage';
import { AuthUser } from '../types/authTypes';

interface AuthContextType {
  user: AuthUser | null;
  sessionToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: AuthUser, token: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Criterio de Aceptación: Carga de sesión desde el almacenamiento seguro del teléfono
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await authStorage.getToken();
        if (token) {
          setSessionToken(token);
          // Nota: En una fase posterior puedes decodificar el JWT o llamar a /auth/me 
          // para recuperar el objeto completo del usuario tras un reinicio.
        }
      } catch (e) {
        console.error('Failed to restore session token from SecureStore', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const login = (userData: AuthUser, token: string) => {
    setUser(userData);
    setSessionToken(token);
  };

  const logout = async () => {
    await authStorage.removeToken();
    setUser(null);
    setSessionToken(null);
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        sessionToken,
        isAuthenticated: !!sessionToken,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}