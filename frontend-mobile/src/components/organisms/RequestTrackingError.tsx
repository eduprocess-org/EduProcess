import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AlertTriangle } from 'lucide-react-native'; // Usamos lucide-react-native
import { COLORS } from '../../core/theme/colors';

interface Props {
  message: string;
}

// Obtenemos la altura de la pantalla para calcular el equivalente al min-h-[60vh] de la web
const { height: screenHeight } = Dimensions.get('window');

export default function RequestTrackingError({ message }: Props) {
  return (
    <View style={styles.centerWrapper}>
      <View style={styles.errorCard}>
        {/* Icon Wrapper Círculo Rojo */}
        <View style={styles.iconCircle}>
          <AlertTriangle size={26} color={COLORS.rejected.indicator} />
        </View>

        {/* Título de Error */}
        <Text style={styles.errorTitle}>Something went wrong</Text>

        {/* Mensaje dinámico del Backend */}
        <Text style={styles.errorSubtitle}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerWrapper: {
    minHeight: screenHeight * 0.6, // 🚀 Equivalente estricto a min-h-[60vh] para centrar verticalmente en el celular
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorCard: {
    width: '100%',
    maxWidth: 340, // max-w-md adaptado a proporciones móviles cómodas
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fee2e2', // red-100 sutil para denotar el estado de error
    padding: 32,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fee2e2', // red-50 de fondo
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a', // slate-900
    textAlign: 'center',
  },
  errorSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748b', // slate-500
    textAlign: 'center',
    lineHeight: 20,
  },
});