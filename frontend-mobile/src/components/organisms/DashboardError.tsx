import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

interface DashboardErrorProps {
  message: string;
}

export default function DashboardError({ message }: DashboardErrorProps) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      
      {/* Contenedor del Icono de Advertencia */}
      <View style={styles.iconWrapper}>
        <AlertTriangle size={22} color="#ef4444" />
      </View>

      {/* Título del Error */}
      <Text style={styles.title}>Something went wrong</Text>

      {/* Mensaje dinámico proveniente del Hook */}
      <Text style={styles.message}>
        {message}
      </Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fee2e2',
    backgroundColor: '#fef2f2',
    paddingVertical: 56,
    paddingHorizontal: 24,
  },
  iconWrapper: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#fee2e2',
  },
  title: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#b91c1c',
  },
  message: {
    marginTop: 6,
    maxWidth: 240,
    fontSize: 14,
    color: '#ef4444',
    textAlign: 'center',
    lineHeight: 20,
  },
});