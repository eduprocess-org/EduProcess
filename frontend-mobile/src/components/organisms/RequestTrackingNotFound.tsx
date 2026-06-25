import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SearchX } from 'lucide-react-native'; // Usamos lucide-react-native
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../core/theme/colors';

const { height: screenHeight } = Dimensions.get('window');

export default function RequestTrackingNotFound() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.centerWrapper}>
      <View style={styles.card}>
        
        {/* Icon Wrapper Gris */}
        <View style={styles.iconCircle}>
          <SearchX size={26} color="#94a3b8" />
        </View>

        {/* Título de Estado Vacío */}
        <Text style={styles.title}>Tracking information not found</Text>

        {/* Mensaje Informativo */}
        <Text style={styles.subtitle}>
          The requested tracking information does not exist or may have been removed.
        </Text>

        {/* Botón Nativo de Regreso al Catálogo */}
        <TouchableOpacity
          style={styles.catalogButton}
          onPress={() => navigation.navigate("Procedures")}
          activeOpacity={0.8}
        >
          <Text style={styles.catalogButtonText}>Back to Catalog</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerWrapper: {
    minHeight: screenHeight * 0.6, // Equivalente estricto a min-h-[60vh]
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxWidth: 340, // max-w-md adaptado a UI móvil
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    padding: 32,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f8fafc', // slate-100 de fondo
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a', // slate-900
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748b', // slate-500
    textAlign: 'center',
    lineHeight: 20,
  },
  catalogButton: {
    marginTop: 24,
    backgroundColor: '#0B2D63', // El azul principal UCE
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%', // En móvil los botones anchos son más fáciles de presionar
    alignItems: 'center',
    justifyContent: 'center',
  },
  catalogButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});