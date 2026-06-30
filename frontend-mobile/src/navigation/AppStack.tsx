import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 🚀 1. Importas el contenedor de pestañas que acabamos de armar
import AppTabs from './AppTabs'; 
import RequestTrackingPage from '../components/pages/RequestTrackingPage';

// Definimos el tipado estricto del Stack Privado
export type AppStackParamList = {
  MainTabs: undefined; // 🚀 Contiene Dashboard, Procedures, Search y Notifications
  RequestTracking: { requestId: string }; // Pantalla de detalle (se abre encima de las pestañas)
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator 
      id = "AppStack"
      screenOptions={{ 
        headerShown: false, // Ocultamos para que no se duplique con los headers de las pestañas
        animation: 'slide_from_right' 
      }}
    >
      {/* 🚀 2. La primera pantalla carga todo tu menú inferior con sus 4 páginas */}
      <Stack.Screen name="MainTabs" component={AppTabs} />
      
      {/* 🚀 3. Las pantallas de detalle van aquí afuera para que tapen el menú al abrirse */}
      <Stack.Screen name="RequestTracking" component={RequestTrackingPage} />
    </Stack.Navigator>
  );
}