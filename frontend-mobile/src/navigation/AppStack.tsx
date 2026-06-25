import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentDashboardPage from '../components/pages/DashboardPage';
import RequestTrackingPage from '../components/pages/RequestTrackingPage';

// Definimos el tipado estricto de las rutas privadas para el autocompletado
export type AppStackParamList = {
  StudentDashboard: undefined;
  RequestTracking: { requestId: string }; // Exige el parámetro ID
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right' // Animación fluida nativa
      }}
    >
      <Stack.Screen name="StudentDashboard" component={StudentDashboardPage} />
      <Stack.Screen name="RequestTracking" component={RequestTrackingPage} />
    </Stack.Navigator>
  );
}