import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from './src/core/context/AuthContext';
import LoginPage from './src/components/pages/LoginPage';
import StudentDashboardPage from './src/components/pages/DashboardPage';

// Definición de las rutas del Stack de Navegación
const Stack = createNativeStackNavigator();

function RootNavigation() {
  const { isAuthenticated, isLoading } = useAuth();

  // 1. Validar indicador de carga (Cambiamos el texto plano por un spinner nativo)
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0B2D63" />
        <Text style={styles.text}>Restoring session...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // 2. Flujo de Pantallas Privadas (Estudiante Autenticado)
          <Stack.Group>
            <Stack.Screen 
              name="StudentDashboard" 
              component={StudentDashboardPage} 
            />
            {/* Aquí puedes ir registrando las siguientes pantallas que navegamos desde las tarjetas:
              <Stack.Screen name="Procedures" component={ProceduresPage} />
              <Stack.Screen name="RequestTracking" component={RequestTrackingPage} />
              <Stack.Screen name="ProcedureDetails" component={ProcedureDetailsPage} />
            */}
          </Stack.Group>
        ) : (
          // 3. Flujo Público (Autenticación / Login)
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginPage} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 24, 
    backgroundColor: '#f8fafc' 
  },
  text: { 
    marginTop: 12, 
    fontSize: 16, 
    color: '#64748b',
    fontWeight: '500' 
  }
});