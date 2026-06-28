import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, Eye } from 'lucide-react-native';
import StatusBadge from '../atoms/StatusBadge';
import { StudentRequest } from '../../core/types/studentDashboard.types';
import { STATUS_CONFIG } from '../../core/types/status.types'; 

interface RequestCardProps {
  request: StudentRequest; 
  onTrack: (id: string) => void;
}

const getValidStatusKey = (status: string): keyof typeof STATUS_CONFIG => {
  const normalized = status?.trim().toUpperCase();
  if (normalized === 'SUBMITTED') return 'SUBMITTED';
  if (normalized === 'UNDER REVIEW' || normalized === 'PENDING') return 'PENDING';
  if (normalized === 'APPROVED') return 'APPROVED';
  if (normalized === 'REJECTED') return 'REJECTED';
  return 'PENDING';
};

export default function RequestCard({ request, onTrack }: RequestCardProps) {
  const displayDate = request.createdAt ? request.createdAt.split('T')[0] : '';
  
  const statusKey = getValidStatusKey(request.status);
  const currentStatusConfig = STATUS_CONFIG[statusKey];

  const displayTitle = request.procedureName || 'Unassigned Procedure';

  return (
    <View style={styles.card}>
      <View style={[styles.stateIndicator, { backgroundColor: currentStatusConfig.dot }]} />

      <View style={styles.contentContainer}>
        <View style={styles.iconWrapper}>
          <FileText size={20} color="#475569" />
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.titleText} numberOfLines={1}>
            {displayTitle}
          </Text>

          <View style={styles.metaRow}>
            <StatusBadge status={request.status} />

            {displayDate ? <Text style={styles.dateText}>{displayDate}</Text> : null}
          </View>
        </View>
      </View>

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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 12,
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
    gap: 8,
    flexWrap: 'wrap',
  },
  dateText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 85,
    marginLeft: 12,
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
    paddingHorizontal: 12,
    paddingVertical: 7,
    width: '100%',
  },
  trackIcon: {
    marginTop: 1,
  },
  trackButtonText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
  },
});