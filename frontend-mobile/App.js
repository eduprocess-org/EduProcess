import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

// Tu IP local y el puerto de tu servidor Express
const API_URL = 'http://192.168.100.63:3000'; 

export default function App() {
  const [status, setStatus] = useState('Conectando al backend de EduProcess...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Usamos fetch nativo para evitar problemas de compatibilidad
    fetch(API_URL)
      .then((response) => {
        // No importa si responde un 200, 404 o 500; si llega aquí, hay comunicación por red
        setStatus('¡CONEXIÓN EXITOSA! 🎉 El celular se comunicó con el backend.');
      })
      .catch((error) => {
        setStatus('Error de conexión ❌\n' + error.message);
        console.log('Detalle del error:', error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prueba de Red Local</Text>
      <Text style={styles.subtitle}>Intentando conectar a: {API_URL}</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0B2D63" />
      ) : (
        <Text style={styles.status}>{status}</Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B2D63',
    textAlign: 'center',
    lineHeight: 24,
  },
});