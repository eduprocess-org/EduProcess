import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RequestStatus } from '../../core/types/studentDashboard.types';
import { STATUS_CONFIG } from '../../core/types/status.types';

interface StatusBadgeProps {
  status: RequestStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const current = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
  const Icon = current.icon;

  return (
    <View 
      style={[styles.badge, { backgroundColor: current.bg, borderColor: current.border }]}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${current.labelText}`}
    >
      <View style={[styles.dot, { backgroundColor: current.dot }]} />
      <Icon size={12} color={current.text} />
      <Text style={[styles.text, { color: current.text }]}>
        {current.labelText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});