import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, RefreshCw, ArrowLeft, FileText } from 'lucide-react-native'; 
import { useNavigation } from '@react-navigation/native'; 
import StatusBadge from '../../molecules/TrackStatusBadge'; 
import { RequestStatus } from '../../../core/types/studentDashboardTypes';

interface RequestTrackingHeaderProps {
  procedureName: string;
  status: RequestStatus;
  submissionDate: string;
  lastUpdateDate: string;
}

const cleanDate = (dateString: string): string => 
  dateString ? dateString.split('T')[0] : '';

export default function RequestTrackingHeader({
  procedureName,
  status,
  submissionDate,
  lastUpdateDate,
}: RequestTrackingHeaderProps) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.6}
        accessibilityRole="button"
        accessibilityLabel="Go back to dashboard"
      >
        <ArrowLeft size={15} color="#64748b" />
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.topAccent} />

        <View style={styles.cardBody}>
          <View style={styles.categoryBadge}>
            <FileText size={11} color="#0B2D63" />
            <Text style={styles.categoryBadgeText}>Request Tracking</Text>
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.procedureTitle}>
              {procedureName}
            </Text>
            <View style={styles.badgeWrapper}>
              <StatusBadge status={status} />
            </View>
          </View>

          <View style={styles.datesGrid}>
            
            <View style={styles.dateBox}>
              <View style={[styles.iconContainer, { backgroundColor: '#EEF2FA' }]}>
                <Calendar size={14} color="#0B2D63" />
              </View>
              <View style={styles.dateTextGroup}>
                <Text style={styles.dateLabel}>Submission Date</Text>
                <Text style={styles.dateValue}>{cleanDate(submissionDate)}</Text>
              </View>
            </View>

            <View style={styles.dateBox}>
              <View style={[styles.iconContainer, { backgroundColor: '#E1F5EE' }]}>
                <RefreshCw size={14} color="#0F6E56" />
              </View>
              <View style={styles.dateTextGroup}>
                <Text style={styles.dateLabel}>Last Update</Text>
                <Text style={styles.dateValue}>{cleanDate(lastUpdateDate)}</Text>
              </View>
            </View>

          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  topAccent: {
    height: 3,
    width: '100%',
    backgroundColor: '#0B2D63', 
  },
  cardBody: {
    padding: 24,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EEF2FA',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0B2D63',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titleBlock: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
  },
  procedureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    lineHeight: 26,
  },
  badgeWrapper: {
    alignSelf: 'flex-start',
  },
  datesGrid: {
    flexDirection: 'column',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTextGroup: {
    flexDirection: 'column',
    gap: 2,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
});