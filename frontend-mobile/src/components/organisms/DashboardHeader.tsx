import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LogOut } from 'lucide-react-native';
import { COLORS } from '../../core/theme/colors';

interface DashboardHeaderProps {
  user: any; // 🚀 Cambiamos userName por el objeto user completo para tener más margen de maniobra
  onLogout: () => void;
}

export default function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {

const displayName = user?.firstName || user?.name || user?.lastName?.split(' ')[0] || 'Estudiante';
    
  return (
    <View style={styles.headerGroup}>
      {/* Fila de Utilidades Superiores (Saludo + LogOut) */}
      <View style={styles.topBar}>
        <Text style={styles.welcomeText}>Hola, {displayName}</Text>
        <TouchableOpacity 
          style={styles.logoutIconButton} 
          onPress={onLogout}
          activeOpacity={0.7}
          accessibilityLabel="Cerrar sesión institucional"
        >
          <LogOut size={16} color={COLORS.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Título de la sección purificado */}
      <View style={styles.headerRow}>
        <View style={styles.titleWrapper}>
          <Text style={styles.mainTitle}>My Requests Dashboard</Text>
          <Text style={styles.subtitle}>
            Track all your submitted procedure requests.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerGroup: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingTop: 10,
    paddingBottom: 12,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSub,
  },
  logoutIconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleWrapper: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
  }
});