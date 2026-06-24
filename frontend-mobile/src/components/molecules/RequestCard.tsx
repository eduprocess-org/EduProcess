import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, Eye } from 'lucide-react-native';

interface RequestCardProps {
  request: {
    id: string;
    title?: string;       // Mapeado según el nombre del trámite (ej. "Constancia de Estudios")
    procedureName?: string; // Alternativa según la estructura de tu modelo
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | string;
    createdAt: string;
  };
  onTrack: (id: string) => void;
}

export default function RequestCard({ request, onTrack }: RequestCardProps) {
  // Manejo dinámico de estilos según el estado del trámite para el tag visual
  const getStatusStyles = (status: string) => {
    switch (status.toUpperCase()) {
      case 'APPROVED':
        return {
          container: styles.statusApproved,
          text: styles.textApproved,
          dot: styles.dotApproved,
          label: 'Approved',
          indicator: styles.indicatorApproved
        };
      case 'REJECTED':
        return {
          container: styles.statusRejected,
          text: styles.textRejected,
          dot: styles.dotRejected,
          label: 'Rejected',
          indicator: styles.indicatorRejected
        };
      default:
        return {
          container: styles.statusPending,
          text: styles.textPending,
          dot: styles.dotPending,
          label: 'Pending',
          indicator: styles.indicatorPending
        };
    }
  };

  const statusStyle = getStatusStyles(request.status);
  const displayTitle = request.title || request.procedureName || "Trámite Universitario";

  // Formateo básico de la fecha (puedes adaptarlo si usas date-fns o similar)
  const displayDate = request.createdAt ? request.createdAt.split('T')[0] : '';

  return (
    <View style={styles.card}>
      {/* Barra indicadora lateral de color según estado */}
      <View style={[styles.stateIndicator, statusStyle.indicator]} />

      {/* Contenido Izquierdo: Icono + Textos */}
      <View style={styles.contentContainer}>
        <View style={styles.iconWrapper}>
          <FileText size={20} color="#475569" />
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.titleText} numberOfLines={1}>
            {displayTitle}
          </Text>

          <View style={styles.metaRow}>
            {/* Badge de Estado */}
            <View style={[styles.statusBadge, statusStyle.container]}>
              <View style={[styles.statusDot, statusStyle.dot]} />
              <Text style={[styles.statusText, statusStyle.text]}>
                {statusStyle.label}
              </Text>
            </View>

            {/* Fecha de Creación */}
            {displayDate ? <Text style={styles.dateText}>{displayDate}</Text> : null}
          </View>
        </View>
      </View>

      {/* Contenido Derecho: Única Acción Autorizada (Track) */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => onTrack(request.id)}
          activeOpacity={0.7}
          accessibilityLabel={`Track request ${displayTitle}`}
        >
          <Eye size={14} color="#475569" style={styles.trackIcon} />
          <Text style={styles.trackButtonText}>Track</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  stateIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  contentContainer: {
    flex: 1,                   // 🚀 Ocupa todo el espacio sobrante de la izquierda
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 12,          // Margen de seguridad para que no choque con el botón
  },
  iconWrapper: {
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 12,
  },
  infoWrapper: {
    flex: 1,
    gap: 6,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 85,                 // 🚀 Fijamos un ancho estricto para el área del botón
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    width: '100%',             // Ahora se estirará de forma segura hasta los 85px fijos
  },
  trackIcon: {
    marginTop: 1,
  },
  trackButtonText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
  },
  /* Variantes de Color por Estado */
  indicatorPending: { backgroundColor: '#eab308' },
  statusPending: { backgroundColor: '#fef9c3' },
  textPending: { color: '#854d0e' },
  dotPending: { backgroundColor: '#ca8a04' },

  indicatorApproved: { backgroundColor: '#22c55e' },
  statusApproved: { backgroundColor: '#dcfce7' },
  textApproved: { color: '#166534' },
  dotApproved: { backgroundColor: '#16a34a' },

  indicatorRejected: { backgroundColor: '#ef4444' },
  statusRejected: { backgroundColor: '#fee2e2' },
  textRejected: { color: '#991b1b' },
  dotRejected: { backgroundColor: '#dc2626' },
});