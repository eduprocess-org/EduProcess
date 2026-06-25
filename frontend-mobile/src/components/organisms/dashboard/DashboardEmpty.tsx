// src/components/molecules/DashboardEmpty.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FolderOpen } from 'lucide-react-native';
import Button from '../../atoms/Button';

interface DashboardEmptyProps {
  onBrowseProcedures: () => void;
}

export default function DashboardEmpty({ onBrowseProcedures }: DashboardEmptyProps) {
  return (
    <View style={styles.container} accessibilityRole="summary">
      
      <View style={styles.iconWrapper}>
        <FolderOpen size={26} color="#94a3b8" />
      </View>

      <Text style={styles.title}>No Requests Found</Text>

      <Text style={styles.subtitle}>
        You have not submitted any procedure requests yet.
      </Text>

      <Button 
        label="Browse Procedures"
        onPress={onBrowseProcedures}
        style={styles.buttonSpacing}
      />
      
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
    borderColor: '#f1f5f9',
    backgroundColor: '#ffffff',
    paddingVertical: 64,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconWrapper: {
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: '#f1f5f9',
  },
  title: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  subtitle: {
    marginTop: 6,
    maxWidth: 240,
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonSpacing: {
    marginTop: 24, 
    width: '100%', 
  },
});