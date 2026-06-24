// App.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider, useAuth } from './src/core/context/AuthContext';
import LoginPage from './src/auth/pages/LoginPage';
import Button from './src/components/atoms/Button';

function RootNavigation() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  // 1. Validar indicador de carga mientras SecureStore lee el token
  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Restoring session...</Text>
      </View>
    );
  }

  // 2. Si está autenticado, mostramos una pantalla intermedia de éxito (Dashboard Temporal)
  if (isAuthenticated) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>¡Authentication Successful! 🎉</Text>
        <Text style={styles.subtitle}>Welcome back, {user?.firstName || 'Student'}</Text>
        <Text style={styles.roleBadge}>Role: {user?.role}</Text>
        
        <View style={{ width: '80%', marginTop: 20 }}>
          <Button label="Sign Out (Clear Session)" onPress={logout} />
        </View>
      </View>
    );
  }

  // 3. Si no hay token, renderiza la página atómica de Login
  // Pasamos un objeto mock de navegación para simular el comportamiento sin react-navigation todavía
  return <LoginPage navigation={{ replace: () => {} }} />;
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f8fafc' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0B2D63', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#475569', marginBottom: 4 },
  roleBadge: { fontSize: 12, fontWeight: 'bold', color: '#1e3a8a', backgroundColor: '#dbeafe', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, marginTop: 4 },
  text: { fontSize: 16, color: '#64748b' }
});