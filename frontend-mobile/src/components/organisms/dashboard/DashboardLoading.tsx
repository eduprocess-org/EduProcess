// src/components/templates/DashboardLoading.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../../core/theme/colors';

export default function DashboardLoading() {
  const pulseAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: pulseAnim }]}>
      
      <View style={styles.headerGroup}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonSubtitle} />
      </View>

      <View style={styles.grid}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={styles.cardSkeleton}>
            <View style={styles.rowHeader}>
              <View style={styles.skeletonLabel} />
              <View style={styles.skeletonIcon} />
            </View>
            <View style={styles.skeletonValue} />
          </View>
        ))}
      </View>

      <View style={styles.listGroup}>
        {[...Array(3)].map((_, i) => (
          <View key={i} style={styles.listCardSkeleton}>
            <View style={styles.listBody}>
              <View style={styles.skeletonItemTitle} />
              <View style={styles.skeletonItemMeta} />
            </View>
            <View style={styles.actionsRow}>
              <View style={styles.skeletonBtnSmall} />
              <View style={styles.skeletonBtnLarge} />
            </View>
          </View>
        ))}
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerGroup: {
    flexDirection: 'column',
    gap: 8,
    marginBottom: 24,
  },
  skeletonTitle: {
    height: 24,
    width: 200,
    backgroundColor: COLORS.textMuted || '#e2e8f0',
    borderRadius: 8,
  },
  skeletonSubtitle: {
    height: 16,
    width: 260,
    backgroundColor: COLORS.border || '#f1f5f9',
    borderRadius: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  cardSkeleton: {
    width: '48.5%',
    flexGrow: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border || '#f1f5f9',
    padding: 14,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skeletonLabel: {
    height: 12,
    width: 60,
    backgroundColor: COLORS.textMuted || '#e2e8f0',
    borderRadius: 4,
  },
  skeletonIcon: {
    height: 28,
    width: 28,
    borderRadius: 8,
    backgroundColor: COLORS.border || '#f1f5f9',
  },
  skeletonValue: {
    height: 32,
    width: 48,
    backgroundColor: COLORS.textMuted || '#e2e8f0',
    borderRadius: 6,
  },
  listGroup: {
    flexDirection: 'column',
    gap: 10,
  },
  listCardSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border || '#f1f5f9',
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  listBody: {
    flexDirection: 'column',
    gap: 8,
    flex: 1,
  },
  skeletonItemTitle: {
    height: 14,
    width: '75%',
    backgroundColor: COLORS.textMuted || '#e2e8f0',
    borderRadius: 4,
  },
  skeletonItemMeta: {
    height: 12,
    width: '45%',
    backgroundColor: COLORS.border || '#f1f5f9',
    borderRadius: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 6,
    marginLeft: 8,
  },
  skeletonBtnSmall: {
    height: 26,
    width: 55,
    backgroundColor: COLORS.border || '#f1f5f9',
    borderRadius: 8,
  },
  skeletonBtnLarge: {
    height: 26,
    width: 65,
    backgroundColor: COLORS.textMuted || '#e2e8f0',
    borderRadius: 8,
  },
});