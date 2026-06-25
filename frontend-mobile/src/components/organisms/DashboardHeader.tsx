import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LogOut } from 'lucide-react-native';
import { COLORS } from '../../core/theme/colors';
import {AppBrandHeader} from '../molecules/AppBrandHeader'; // 🚀 Importamos la nueva marca

interface DashboardHeaderProps {
  user: any;
  onLogout: () => void;
}

export default function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const displayName = user?.firstName || user?.name || user?.lastName?.split(' ')[0] || 'Estudiante';

  return (
    <View style={styles.headerGroup}>
      
      <View style={styles.navBar}>
        <AppBrandHeader />
        <TouchableOpacity 
          style={styles.logoutIconButton} 
          onPress={onLogout}
          activeOpacity={0.7}
          accessibilityLabel="Cerrar sesión"
        >
          <LogOut size={16} color={COLORS.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeRow}>
        <Text style={styles.welcomeText}>Welcome, {displayName}</Text>
      </View>

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
    gap: 14,
    marginBottom: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logoutIconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.border,
  },
  welcomeRow: {
    paddingTop: 4,
  },
  welcomeText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSub,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 4,
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
    marginTop: 2,
  }
});