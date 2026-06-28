import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SummaryCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  footerIcon: React.ElementType;
  footerText: string;
  iconBg: string;
  iconColor: string;
  valueColor: string;
}

export default function SummaryCard({
  label,
  value,
  icon: Icon,
  footerIcon: FooterIcon,
  footerText,
  iconBg,
  iconColor,
  valueColor,
}: SummaryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.rowHeader}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          <Icon size={14} color={iconColor} />
        </View>
      </View>

      <Text style={[styles.value, { color: valueColor }]}>
        {value}
      </Text>

      <View style={styles.footerRow}>
        <FooterIcon size={11} color="#94a3b8" />
        <Text style={styles.footerText}>{footerText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48.5%', 
    flexGrow: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0B2D63',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iconContainer: {
    height: 28,
    width: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 11,
    color: '#94a3b8',
  },
});