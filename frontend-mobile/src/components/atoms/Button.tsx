import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({ label, onPress, loading, disabled }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, (disabled || loading) && styles.disabled]} 
      onPress={onPress} 
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0B2D63',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    elevation: 5,
  },
  disabled: { backgroundColor: '#94a3b8' },
  text: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});