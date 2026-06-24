import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock, CheckCircle, XCircle } from 'lucide-react-native';
import { RequestStatus } from '../../core/types/studentDashboardTypes';

interface StatusBadgeProps {
  status: RequestStatus;
}

// Configuración de estilos visuales adaptada de tu versión Tailwind web
const config = {
  PENDING: {
    icon: Clock,
    bg: '#FAEEDA',
    border: '#FAC775',
    text: '#854F0B',
    dot: '#EF9F27',
    labelText: 'Under Review',
  },
  APPROVED: {
    icon: CheckCircle,
    bg: '#E1F5EE',
    border: '#9FE1CB',
    text: '#0F6E56',
    dot: '#1D9E75',
    labelText: 'Approved',
  },
  REJECTED: {
    icon: XCircle,
    bg: '#FCEBEB',
    border: '#F7C1C1',
    text: '#A32D2D',
    dot: '#E24B4A',
    labelText: 'Rejected',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const current = config[status] || config.PENDING;
  const Icon = current.icon;

  return (
    <View 
      style={[styles.badge, { backgroundColor: current.bg, borderColor: current.border }]}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${current.labelText}`}
    >
      {/* El punto de color (dot) */}
      <View style={[styles.dot, { backgroundColor: current.dot }]} />
      
      {/* Icono nativo de Lucide */}
      <Icon size={12} color={current.text} />
      
      {/* Texto descriptivo del estado */}
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
    alignSelf: 'flex-start', // Evita que el contenedor se estire a lo ancho en móviles
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