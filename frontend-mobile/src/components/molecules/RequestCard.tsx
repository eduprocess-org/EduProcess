import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Eye, MapPin, Calendar, FileText, FileCheck, Receipt, GraduationCap } from 'lucide-react-native';
import { StudentRequest } from '../../core/types/studentDashboardTypes';
import StatusBadge from '../atoms/StatusBadge';

interface RequestCardProps {
  request: StudentRequest;
  onTrack: (id: string) => void;
  onView: (procedureId: string) => void;
}

// Configuración de colores para la barra de estado lateral herederos del diseño web
const barConfig: Record<string, string> = {
  PENDING: '#EF9F27',
  APPROVED: '#1D9E75',
  REJECTED: '#E24B4A',
};

// Configuración de colores de fondo e icono para el bloque decorativo del trámite
const iconConfig: Record<string, { bg: string; color: string }> = {
  PENDING: { bg: '#FAEEDA', color: '#854F0B' },
  APPROVED: { bg: '#E1F5EE', color: '#0F6E56' },
  REJECTED: { bg: '#FCEBEB', color: '#A32D2D' },
};

function getProcedureIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('enrollment')) return FileCheck;
  if (lower.includes('tuition') || lower.includes('payment')) return Receipt;
  if (lower.includes('grade') || lower.includes('academic')) return GraduationCap;
  return FileText;
}

export default function RequestCard({ request, onTrack, onView }: RequestCardProps) {
  const sideBarColor = barConfig[request.status] || '#cbd5e1';
  const iconTheme = iconConfig[request.status] || { bg: '#f1f5f9', color: '#64748b' };
  const ProcedureIcon = getProcedureIcon(request.procedureName);

  return (
    <View style={styles.card} accessibilityRole="summary">
      {/* Barra de estado lateral */}
      <View style={[styles.statusBar, { backgroundColor: sideBarColor }]} />

      {/* Contenedor del Icono del Trámite */}
      <View style={[styles.iconContainer, { backgroundColor: iconTheme.bg }]}>
        <ProcedureIcon size={16} color={iconTheme.color} />
      </View>

      {/* Cuerpo de la Información */}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {request.procedureName}
        </Text>
        <View style={styles.metaRow}>
          {/* Reutilización del Átomo de Estado */}
          <StatusBadge status={request.status} />
          
          <View style={styles.dateBadge}>
            <Calendar size={11} color="#94a3b8" />
            <Text style={styles.dateText}>{request.createdAt}</Text>
          </View>
        </View>
      </View>

      {/* Bloque Lateral de Acciones Rápidas */}
      <View style={styles.actionsColumn}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => onTrack(request.id)}
          activeOpacity={0.7}
        >
          <MapPin size={12} color="#64748b" />
          <Text style={styles.trackText}>Track</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => onView(request.procedureId)}
          activeOpacity={0.7}
        >
          <Eye size={12} color="#ffffff" />
          <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 14,
    // Sombras nativas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  statusBar: {
    height: 40,
    width: 3,
    borderRadius: 2,
    marginRight: 10,
  },
  iconContainer: {
    height: 36,
    width: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  body: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  actionsColumn: {
    flexDirection: 'column',
    gap: 6,
    marginLeft: 8,
    justifyContent: 'center',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    minWidth: 65,
  },
  trackText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748b',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#0B2D63',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    minWidth: 65,
  },
  viewText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#ffffff',
  },
});