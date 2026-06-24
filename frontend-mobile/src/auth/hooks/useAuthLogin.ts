import { useState } from 'react';
import { useForm, Control, UseFormHandleSubmit } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from 'react-native';
import { login as apiLogin } from '../services/authService'; 
import { authStorage } from '../../core/storage/authStorage';
import { loginSchema, LoginFormData } from '../utils/validators';
import { useAuth } from '../../core/context/AuthContext';

interface UseAuthLoginReturn {
  control: Control<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
}

export const useAuthLogin = (onNavigate: (role: string) => void): UseAuthLoginReturn => {
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

      // 1. Petición HTTP al backend mediante tu apiClient de Axios
      const response = await apiLogin(data);

      // 2. Guardar el usuario y el token de sesión en el estado global (Contexto)
      contextLogin(response.data.user, response.data.tokens.sessionToken);

      // 3. Persistir el refresh token de forma segura para la reconstrucción de sesión
      await authStorage.saveToken(response.data.tokens.refreshToken);

      Alert.alert("Success", "Welcome back! Loading system...");
      
      // 4. Ejecutar el callback de navegación según el rol retornado
      onNavigate(response.data.user.role);

    } catch (error: any) {
      console.error(error);

      // Manejo de errores idéntico a tu lógica original de React web
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