import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../../core/theme/colors';

export default function RequestTrackingSkeleton() {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const skeletonColor = COLORS.border || '#e2e8f0';

  return (
    <Animated.View style={[styles.container, { opacity: pulseAnim }]}>
      
      <View style={[styles.skeleton, styles.backLink]} />

      <View style={styles.card}>
        <View style={[styles.topAccentBar, { backgroundColor: COLORS.primary || '#0B2D63' }]} />
        <View style={styles.cardBody}>
          <View style={[styles.skeleton, styles.categoryBadge]} />
          <View style={styles.rowBetween}>
            <View style={[styles.skeleton, styles.mainTitle]} />
            <View style={[styles.skeleton, styles.statusBadge]} />
          </View>
          <View style={styles.divider} />
          <View style={styles.gridFallback}>
            <View style={[styles.skeleton, styles.dateBoxBlock]} />
            <View style={[styles.skeleton, styles.dateBoxBlock]} />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={[styles.skeleton, styles.headerIcon]} />
          <View style={[styles.skeleton, styles.headerTitle]} />
        </View>
        
        {[...Array(3)].map((_, i) => (
          <View key={i} style={styles.timelineRow}>
            <View style={styles.leftColumn}>
              <View style={[styles.skeleton, styles.timelineNode]} />
              {i < 2 && <View style={[styles.timelineConnector, { backgroundColor: COLORS.border || '#f1f5f9' }]} />}
            </View>
            <View style={styles.rightColumn}>
              <View style={[styles.skeleton, styles.textLineLg]} />
              <View style={[styles.skeleton, styles.textLineSm]} />
              <View style={[styles.skeleton, styles.textLineMd]} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={[styles.skeleton, styles.headerIcon]} />
          <View style={[styles.skeleton, styles.headerTitleLong]} />
        </View>
        <View style={styles.cardBodyPadding}>
          <View style={[styles.skeleton, styles.commentBoxBlock]} />
        </View>
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20,
  },
  skeleton: {
    backgroundColor: '#e2e8f0', 
    borderRadius: 6,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  topAccentBar: {
    height: 3,
    width: '100%',
  },
  cardBody: {
    padding: 24,
  },
  cardBodyPadding: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 16,
  },
  gridFallback: {
    flexDirection: 'column',
    gap: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  leftColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 24,
  },
  
  /* 🦴 Bloques Semánticos Simplificados */
  backLink: {
    height: 16,
    width: 144,
  },
  categoryBadge: {
    height: 20,
    width: 112,
    borderRadius: 100,
    marginBottom: 16,
  },
  mainTitle: {
    height: 24,
    width: '65%',
  },
  statusBadge: {
    height: 24,
    width: 96,
    borderRadius: 100,
  },
  dateBoxBlock: {
    height: 64,
    borderRadius: 12,
  },
  headerIcon: {
    height: 32,
    width: 32,
    borderRadius: 8,
  },
  headerTitle: {
    height: 16,
    width: 96,
  },
  headerTitleLong: {
    height: 16,
    width: 160,
  },
  timelineNode: {
    width: 36,
    height: 36,
    borderRadius: 12,
  },
  timelineConnector: {
    width: 2,
    minHeight: 40,
  },
  textLineLg: {
    height: 14,
    width: 112,
    marginBottom: 4,
  },
  textLineSm: {
    height: 12,
    width: 80,
    marginBottom: 4,
  },
  textLineMd: {
    height: 12,
    width: 192,
  },
  commentBoxBlock: {
    height: 64,
    borderRadius: 12,
  },
});