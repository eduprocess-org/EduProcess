// src/components/molecules/DashboardError.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import Button from '../../atoms/Button'; // 🚀 Reutilización de tu átomo centralizado

interface DashboardErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function DashboardError({ message, onRetry }: DashboardErrorProps) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      
      <View style={styles.iconWrapper}>
        <AlertTriangle size={22} color="#ef4444" />
      </View>

      <Text style={styles.title}>Something went wrong</Text>

      <Text style={styles.message}>
        {message}
      </Text>

      {onRetry && (
        <Button
          label="Try Again"
          onPress={onRetry}
          style={styles.retryButton}
        />
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fee2e2',
    backgroundColor: '#fef2f2',
    paddingVertical: 56,
    paddingHorizontal: 24,
  },
  iconWrapper: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#fee2e2',
  },
  title: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#b91c1c',
  },
  message: {
    marginTop: 6,
    maxWidth: 240,
    fontSize: 14,
    color: '#ef4444',
    textAlign: 'center',
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    backgroundColor: '#b91c1c',
    width: 'auto',
  },
});