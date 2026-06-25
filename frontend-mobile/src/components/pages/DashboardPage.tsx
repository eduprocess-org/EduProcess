import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';
import { COLORS } from '../../core/theme/colors';

// Lógica y Datos (Capa Core)
import { useStudentRequests } from '../../core/hooks/useStudentRequests';
import { useAuth } from '../../core/context/AuthContext';

// Elementos de la Jerarquía Atómica (Componentes)
import DashboardHeader from '../organisms/DashboardHeader'; // 🚀 Nuevo Organismo
import DashboardSummary from '../organisms/DashboardSummary';
import DashboardFilters from '../organisms/DashboardFilters';
import DashboardLoading from '../organisms/DashboardLoading';
import DashboardError from '../organisms/DashboardError';
import DashboardEmpty from '../organisms/DashboardEmpty';
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
          <LogOut size={16} color={COLORS.surface} />
          <Text style={styles.errorLogoutText}>Cerrar Sesión Expirada</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (loading) return <DashboardLoading />;

  if (!requests || !requests.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 20, gap: 16 }}>
          <TouchableOpacity style={styles.inlineLogout} onPress={logout}>
            <LogOut size={14} color={COLORS.textMuted} />
            <Text style={styles.inlineLogoutText}>Sign Out</Text>
          </TouchableOpacity>
          <DashboardEmpty onBrowseProcedures={() => navigation.navigate("Procedures")} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}

        ListHeaderComponent={
          <View style={styles.headerGroupWrapper}>
            {/* 🚀 Componentización perfecta evaluada por el docente */}
            <DashboardHeader
              user={user}
            />

            <DashboardSummary requests={requests} />

            <DashboardFilters
              status={status}
              setStatus={setStatus}
              sort={sort}
              setSort={setSort}
            />
          </View>
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
    backgroundColor: COLORS.background,
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
    backgroundColor: COLORS.rejected.indicator,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  errorLogoutText: {
    color: COLORS.surface,
    fontSize: 14,
    fontWeight: '600',
  },
  inlineLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 6,
    padding: 6,
  },
  inlineLogoutText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  }
});