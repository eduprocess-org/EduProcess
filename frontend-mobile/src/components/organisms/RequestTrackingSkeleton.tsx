import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default function RequestTrackingSkeleton() {
  // Inicializamos el valor de la animación para el efecto "pulse"
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // Configura una animación en bucle infinito (de opacidad 0.4 a 1.0 y viceversa)
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 800,
          useNativeDriver: true, // Optimización nativa por hardware
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: pulseAnim }]}>
      
      {/* 🦴 Back link skeleton */}
      <View style={[styles.skeleton, styles.w36, styles.h4]} />

      {/* 🦴 Header card skeleton */}
      <View style={styles.card}>
        <View style={[styles.skeleton, styles.h05]} />
        <View style={styles.cardBody}>
          <View style={[styles.skeleton, styles.w28, styles.h5, styles.roundedFull, styles.mb4]} />
          <View style={styles.rowBetween}>
            <View style={[styles.skeleton, styles.w64, styles.h6]} />
            <View style={[styles.skeleton, styles.w24, styles.h6, styles.roundedFull]} />
          </View>
          <View style={styles.divider} />
          <View style={styles.gridFallback}>
            <View style={[styles.skeleton, styles.h16, styles.roundedXl, styles.flex1]} />
            <View style={[styles.skeleton, styles.h16, styles.roundedXl, styles.flex1]} />
          </View>
        </View>
      </View>

      {/* 🦴 Timeline card skeleton */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={[styles.skeleton, styles.w8, styles.h8, styles.roundedLg]} />
          <View style={[styles.skeleton, styles.w24, styles.h4]} />
        </View>
        
        {/* Mapeo estricto del bucle [...Array(3)] de la versión web */}
        {[...Array(3)].map((_, i) => (
          <View key={i} style={styles.timelineRow}>
            <View style={styles.leftColumn}>
              <View style={[styles.skeleton, styles.w9, styles.h9, styles.roundedXl]} />
              {i < 2 && <View style={[styles.skeleton, styles.w05, styles.minLineHeight]} />}
            </View>
            <View style={styles.rightColumn}>
              <View style={[styles.skeleton, styles.w28, styles.h4, styles.mb1]} />
              <View style={[styles.skeleton, styles.w20, styles.h3, styles.mb1]} />
              <View style={[styles.skeleton, styles.w48, styles.h3]} />
            </View>
          </View>
        ))}
      </View>

      {/* 🦴 Comments card skeleton */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={[styles.skeleton, styles.w8, styles.h8, styles.roundedLg]} />
          <View style={[styles.skeleton, styles.w40, styles.h4]} />
        </View>
        <View style={[styles.skeleton, styles.h16, styles.roundedXl]} />
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20, // space-y-5
  },
  skeleton: {
    backgroundColor: '#e2e8f0', // slate-200 base color
    borderRadius: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  cardBody: {
    padding: 24,
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
    flexDirection: 'column', // En móvil, se apilan verticalmente para una mejor experiencia UX
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
  /* Utilities de Tamaño y Bordes */
  h05: { height: 3 },
  h3: { height: 12 },
  h4: { height: 16 },
  h5: { height: 20 },
  h6: { height: 24 },
  h8: { height: 32 },
  h9: { height: 36 },
  h16: { height: 64 },
  w05: { width: 2, backgroundColor: '#f1f5f9' }, // slate-100 para conectores de carga
  w8: { width: 32 },
  w9: { width: 36 },
  w20: { width: 80 },
  w24: { width: 96 },
  w28: { width: 112 },
  w36: { width: 144 },
  w40: { width: 160 },
  w48: { width: 192 },
  w64: { width: 256 },
  minLineHeight: { minHeight: 40 },
  flex1: { flex: 1 },
  roundedLg: { borderRadius: 8 },
  roundedXl: { borderRadius: 12 },
  roundedFull: { borderRadius: 100 },
  mb1: { marginBottom: 4 },
  mb4: { marginBottom: 16 },
});