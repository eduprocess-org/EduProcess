import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../core/theme/colors';

export function AppBrandHeader() {
  return (
    <View style={styles.brandContainer}>
      <View style={styles.logoWrapper}>
        <Image 
          source={require('../../../assets/Logo.jpeg')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.brandName}>
        Edu<Text style={styles.brandSubName}>Process</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  logoWrapper: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 28, 
    height: 28,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
    letterSpacing: -0.3,
  },
  brandSubName: {
    color: COLORS.primary,
    fontWeight: '400',
  },
});