import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshCw } from 'lucide-react-native';
import { COLORS } from '../../core/theme/colors';

import RequestTrackingHeader from '../organisms/track/RequestTrackingHeader';
import StatusTimeline from '../organisms/track/StatusTimeline';
import AdministrativeComments from '../organisms/track/AdministrativeComments';
import RequestTrackingError from '../organisms/track/RequestTrackingError';
import RequestTrackingNotFound from '../organisms/track/RequestTrackingNotFound';

import RequestTrackingSkeleton from '../organisms/track/RequestTrackingSkeleton';

import { useRequestTracking } from '../../core/hooks/useRequestTracking';

import { RequestStatus } from '../../core/types/studentDashboard.types';

const mapToRequestStatus = (status: string): RequestStatus => {
  const normalized = status?.trim().toUpperCase();
  if (normalized === 'UNDER REVIEW' || normalized === 'PENDING') return 'PENDING';
  if (normalized === 'APPROVED') return 'APPROVED';
  if (normalized === 'REJECTED') return 'REJECTED';
  return 'PENDING'; // Tu estado por defecto seguro
};

interface RequestTrackingPageProps {
  route: {
    params: {
      requestId?: string;
    };
  };
}

export default function RequestTrackingPage({ route }: RequestTrackingPageProps) {
  const { requestId } = route.params ?? {};
  const { tracking, loading, error, refresh } = useRequestTracking(requestId ?? "");

  if (error) return <SafeAreaView style={styles.safeContainer}><RequestTrackingError message={error} /></SafeAreaView>;
  if (!tracking && !loading) return <SafeAreaView style={styles.safeContainer}><RequestTrackingNotFound /></SafeAreaView>;

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right', 'bottom']}>
      
      <View style={styles.topActionsBar}>
        <View style={styles.flexSpacer} />
        <TouchableOpacity
          onPress={() => refresh()}
          disabled={loading}
          activeOpacity={0.7}
          style={[styles.refreshButton, loading && styles.disabledButton]}
        >
          {loading ? (
            <ActivityIndicator size={12} color="#475569" />
          ) : (
            <RefreshCw size={13} color="#475569" />
          )}
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={loading && !!tracking} 
            onRefresh={refresh} 
            colors={[COLORS.primary || '#0B2D63']} 
            tintColor="#475569"
          />
        }
      >
        {loading && !tracking ? (
          <RequestTrackingSkeleton />
        ) : (
          tracking && (
            <View style={styles.layoutGroup}>
              <RequestTrackingHeader
                procedureName={tracking.procedureName}
                status={mapToRequestStatus(tracking.status)}
                submissionDate={tracking.submissionDate}
                lastUpdateDate={tracking.lastUpdateDate}
              />

              <StatusTimeline timeline={tracking.timeline} />

              <AdministrativeComments comments={tracking.administrativeComments} />
            </View>
          )
        )}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topActionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  flexSpacer: {
    flex: 1,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  refreshButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
  disabledButton: {
    opacity: 0.5,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  layoutGroup: {
    flexDirection: 'column',
    gap: 20,
  },
});