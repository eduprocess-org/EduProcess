import { useState } from 'react';
import { useForm, Control, UseFormHandleSubmit } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from 'react-native';
import { login as apiLogin } from '../services/authService';
import { authStorage } from '../storage/authStorage';
import { loginSchema, LoginFormData } from '../utils/validators';
import { useAuth } from '../context/AuthContext';

interface UseAuthLoginReturn {
  control: Control<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
}

// Simplificamos la firma: removemos el callback onNavigate de la Web ya que App.tsx enruta por estado
export const useAuthLogin = (onSuccessCallback?: () => void): UseAuthLoginReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login: contextLogin } = useAuth();

  // Inicializamos React Hook Form vinculado con el esquema de Zod
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      // 1. Petición HTTP al backend mediante tu apiLogin
      const response = await apiLogin(data as any);
      // CORRECCIÓN: Si response.data ya es { user, tokens }, desestructuramos directamente de ahí:
      const { user, tokens } = response.data;
      const { sessionToken, refreshToken } = tokens;

      // 2. Persistir de forma segura el token de acceso para las firmas de Axios
      await authStorage.saveToken(sessionToken);

      // 3. Cargar el usuario y el token de acceso en el estado de autenticación global
      contextLogin(user, sessionToken);

      if (onSuccessCallback) {
        onSuccessCallback();
      }

    } catch (error: any) {
      console.error("QA Login Error Details:", error);

      if (error.response?.status === 401) {
        Alert.alert("Authentication Failed", "Invalid email or password");
      } else if (error.response?.status === 400) {
        Alert.alert("Bad Request", error.response.data.message || "Bad request parameters");
      } else {
        Alert.alert(
          "Connection Error",
          "Unable to connect to server. Please check your internet connection and backend IP configurations."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { control, handleSubmit, onSubmit, isLoading };
};