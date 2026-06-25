import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';
import { COLORS } from '../../core/theme/colors';

import { useStudentRequests } from '../../core/hooks/useStudentRequests';
import { useAuth } from '../../core/context/AuthContext';

import DashboardHeader from '../organisms/dashboard/DashboardHeader';
import DashboardSummary from '../organisms/dashboard/DashboardSummary';
import DashboardFilters from '../organisms/dashboard/DashboardFilters';
import RequestTrackingSkeleton from '../organisms/track/RequestTrackingSkeleton';
import DashboardError from '../organisms/dashboard/DashboardError';
import DashboardEmpty from '../organisms/dashboard/DashboardEmpty';
import RequestCard from '../molecules/RequestCard';

interface StudentDashboardPageProps {
  navigation: {
    navigate: (screenName: string, params?: object) => void;
  };
}

export default function StudentDashboardPage({ navigation }: StudentDashboardPageProps) {
  const { requests, loading, error } = useStudentRequests();
  const { logout, user } = useAuth();

  const [status, setStatus] = useState<string>("ALL");
  const [sort, setSort] = useState<string>("NEWEST");

  const filteredRequests = useMemo(() => {
    let result = [...(requests || [])];

    if (status !== "ALL") {
      result = result.filter((r) => r.status === status);
    }

    result.sort((a, b) =>
      sort === "NEWEST"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return result;
  }, [requests, status, sort]);

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centerError]}>
        <DashboardError message={error} />
        <TouchableOpacity style={styles.errorLogoutButton} onPress={logout} activeOpacity={0.8}>
          <LogOut size={16} color={COLORS.surface || '#fff'} />
          <Text style={styles.errorLogoutText}>Cerrar Sesión Expirada</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <FlatList
        data={loading ? [] : filteredRequests} 
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}

        ListHeaderComponent={
          <View style={styles.headerGroupWrapper}>
            <DashboardHeader user={user} />

            {!loading && <DashboardSummary requests={requests || []} />}

            {!loading && (
              <DashboardFilters
                status={status}
                setStatus={setStatus}
                sort={sort}
                setSort={setSort}
              />
            )}
          </View>
        }

        ListEmptyComponent={
          loading ? (
            <RequestTrackingSkeleton />
          ) : (
            <DashboardEmpty onBrowseProcedures={() => navigation.navigate("Procedures")} />
          )
        }

        renderItem={({ item }) => (
          <RequestCard
            request={item}
            onTrack={(id) => navigation.navigate("RequestTracking", { requestId: id })}
          />
        )}

        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || '#f8fafc',
  },
  centerError: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
  },
  headerGroupWrapper: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 16,
  },
  separator: {
    height: 10,
  },
  errorLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.rejected?.indicator || '#E24B4A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  errorLogoutText: {
    color: COLORS.surface || '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});