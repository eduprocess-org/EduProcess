import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Files, Clock, CheckCircle, XCircle, TrendingUp, Check, X } from 'lucide-react-native';
import { StudentRequest } from '../../core/types/studentDashboardTypes';

interface DashboardSummaryProps {
  requests: StudentRequest[];
}

export default function DashboardSummary({ requests }: DashboardSummaryProps) {
  const total = requests.length;
  const pending = requests.filter((r) => r.status === 'PENDING').length;
  const approved = requests.filter((r) => r.status === 'APPROVED').length;
  const rejected = requests.filter((r) => r.status === 'REJECTED').length;

  const cards = [
    {
      label: 'Total',
      value: total,
      icon: Files,
      footerIcon: TrendingUp,
      footerText: 'All time',
      iconBg: '#EEF2FA',
      iconColor: '#0B2D63',
      valueColor: '#0B2D63',
    },
    {
      label: 'Pending',
      value: pending,
      icon: Clock,
      footerIcon: Clock,
      footerText: 'Awaiting review',
      iconBg: '#FAEEDA',
      iconColor: '#854F0B',
      valueColor: '#BA7517',
    },
    {
      label: 'Approved',
      value: approved,
      icon: CheckCircle,
      footerIcon: Check,
      footerText: 'Completed',
      iconBg: '#E1F5EE',
      iconColor: '#0F6E56',
      valueColor: '#0F6E56',
    },
    {
      label: 'Rejected',
      value: rejected,
      icon: XCircle,
      footerIcon: X,
      footerText: 'Needs action',
      iconBg: '#FCEBEB',
      iconColor: '#A32D2D',
      valueColor: '#A32D2D',
    },
  ];

  return (
    <View style={styles.grid}>
      {cards.map((card) => {
        const Icon = card.icon;
        const FooterIcon = card.footerIcon;

        return (
          <View key={card.label} style={styles.card}>
            <View style={styles.rowHeader}>
              <Text style={styles.label}>{card.label}</Text>
              <View style={[styles.iconContainer, { backgroundColor: card.iconBg }]}>
                <Icon size={14} color={card.iconColor} />
              </View>
            </View>

            <Text style={[styles.value, { color: card.valueColor }]}>
              {card.value}
            </Text>

            <View style={styles.footerRow}>
              <FooterIcon size={11} color="#94a3b8" />
              <Text style={styles.footerText}>{card.footerText}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  card: {
    // Calcula un ancho aproximado para tener 2 columnas estables restando el espacio del gap
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