// src/components/organisms/DashboardSummary.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Files, TrendingUp, Check, X, Clock } from 'lucide-react-native';
import { StudentRequest } from '../../../core/types/studentDashboardTypes';
import { STATUS_CONFIG } from '../../../core/types/status.types';
import SummaryCard from '../../atoms/SummaryCard';

interface DashboardSummaryProps {
  requests: StudentRequest[];
}

export default function DashboardSummary({ requests }: DashboardSummaryProps) {
  const total = requests.length;
  const pending = requests.filter((r) => r.status === 'PENDING').length;
  const approved = requests.filter((r) => r.status === 'APPROVED').length;
  const rejected = requests.filter((r) => r.status === 'REJECTED').length;

  // Combinamos los datos dinámicos con la configuración visual centralizada
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
      icon: STATUS_CONFIG.PENDING.icon,
      footerIcon: Clock,
      footerText: 'Awaiting review',
      iconBg: STATUS_CONFIG.PENDING.bg,
      iconColor: STATUS_CONFIG.PENDING.text,
      valueColor: STATUS_CONFIG.PENDING.dot, // Cambia por .dot o .text según prefieras la fuerza del color
    },
    {
      label: 'Approved',
      value: approved,
      icon: STATUS_CONFIG.APPROVED.icon,
      footerIcon: Check,
      footerText: 'Completed',
      iconBg: STATUS_CONFIG.APPROVED.bg,
      iconColor: STATUS_CONFIG.APPROVED.text,
      valueColor: STATUS_CONFIG.APPROVED.text,
    },
    {
      label: 'Rejected',
      value: rejected,
      icon: STATUS_CONFIG.REJECTED.icon,
      footerIcon: X,
      footerText: 'Needs action',
      iconBg: STATUS_CONFIG.REJECTED.bg,
      iconColor: STATUS_CONFIG.REJECTED.text,
      valueColor: STATUS_CONFIG.REJECTED.text,
    },
  ];

  return (
    <View style={styles.grid}>
      {cards.map((card) => (
        <SummaryCard
          key={card.label}
          label={card.label}
          value={card.value}
          icon={card.icon}
          footerIcon={card.footerIcon}
          footerText={card.footerText}
          iconBg={card.iconBg}
          iconColor={card.iconColor}
          valueColor={card.valueColor}
        />
      ))}
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
});