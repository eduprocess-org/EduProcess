import * as SecureStore from 'expo-secure-store';

const SESSION_TOKEN_KEY = 'session_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const authStorage = {
  /**
   * Guarda el token de sesión (JWT) de forma segura en el dispositivo.
   */
  saveToken: async (token: string): Promise<void> => {
    await SecureStore.setItemAsync(SESSION_TOKEN_KEY, token);
  },

  /**
   * Recupera el token de sesión activo.
   */
  getToken: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(SESSION_TOKEN_KEY);
  },

  /**
   * Elimina todos los tokens del almacenamiento seguro al cerrar sesión.
   */
  removeToken: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  }
};