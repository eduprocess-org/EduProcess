import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export default function FilterChip({ label, isActive, onPress }: FilterChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#EEF2FA',
    borderColor: '#b8c9e8',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  chipTextActive: {
    color: '#0B2D63',
    fontWeight: '600',
  },
});