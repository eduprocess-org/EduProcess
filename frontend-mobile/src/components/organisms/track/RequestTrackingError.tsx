import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AlertTriangle } from 'lucide-react-native'; 
import { COLORS } from '../../../core/theme/colors';
import Button from '../../atoms/Button'; 

interface RequestTrackingErrorProps {
  message: string;
  onRetry?: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

export default function RequestTrackingError({ message, onRetry }: RequestTrackingErrorProps) {
  return (
    <View style={styles.centerWrapper}>
      <View style={styles.errorCard}>
        <View style={styles.iconCircle}>
          <AlertTriangle size={26} color={COLORS.rejected?.indicator || '#ef4444'} />
        </View>

        <Text style={styles.errorTitle}>Something went wrong</Text>

        <Text style={styles.errorSubtitle}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  centerWrapper: {
    minHeight: screenHeight * 0.6, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorCard: {
    width: '100%',
    maxWidth: 340, 
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fee2e2', 
    padding: 32,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fee2e2', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a', 
    textAlign: 'center',
  },
  errorSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748b', 
    textAlign: 'center',
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 24,
    width: '100%',
    backgroundColor: COLORS.rejected?.indicator || '#b91c1c',
  },
});