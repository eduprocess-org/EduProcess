import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../core/theme/colors';

interface DashboardHeaderProps {
  user: any;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const displayName = user?.firstName || user?.name || user?.lastName?.split(' ')[0] || 'Estudiante';

  return (
    <View style={styles.headerGroup}>
      {/* Saludo dinámico al estudiante */}
      <View style={styles.welcomeRow}>
        <Text style={styles.welcomeText}>Welcome, {displayName}</Text>
      </View>

      {/* Título de sección del Dashboard */}
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
    gap: 10,
    marginTop: 12,
    marginBottom: 4,
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