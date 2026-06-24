import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FolderOpen } from 'lucide-react-native';

interface DashboardEmptyProps {
  // Callback para desacoplar la navegación de la Web (React Router)
  onBrowseProcedures: () => void;
}

export default function DashboardEmpty({ onBrowseProcedures }: DashboardEmptyProps) {
  return (
    <View style={styles.container} accessibilityRole="summary">
      
      {/* Contenedor del Icono Central */}
      <View style={styles.iconWrapper}>
        <FolderOpen size={26} color="#94a3b8" />
      </View>

      {/* Título Principal */}
      <Text style={styles.title}>No Requests Found</Text>

      {/* Descripción Secundaria */}
      <Text style={styles.subtitle}>
        You have not submitted any procedure requests yet.
      </Text>

      {/* Botón de Acción Táctil Nivel Átomo */}
      <TouchableOpacity
        style={styles.button}
        onPress={onBrowseProcedures}
        activeOpacity={0.8}
        accessibilityLabel="Browse available procedures"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Browse Procedures</Text>
      </TouchableOpacity>
      
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
    borderColor: '#f1f5f9',
    backgroundColor: '#ffffff',
    paddingVertical: 64,
    paddingHorizontal: 24,
    // Sombras multiplataforma (iOS & Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconWrapper: {
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: '#f1f5f9',
  },
  title: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  subtitle: {
    marginTop: 6,
    maxWidth: 240,
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#0B2D63',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});