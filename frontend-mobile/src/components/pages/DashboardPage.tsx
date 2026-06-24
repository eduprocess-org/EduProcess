import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';

// Lógica y Datos (Capa Core)
import { useStudentRequests } from '../../core/hooks/useStudentRequests';
import { useAuth } from '../../core/context/AuthContext';

// Elementos de la Jerarquía Atómica (Componentes)
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

  // Manejo de Error Expirado o del Backend (Modo QA Recovery)
  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centerError]}>
        <DashboardError message={error} />
        <TouchableOpacity 
          style={styles.errorLogoutButton} 
          onPress={logout}
          activeOpacity={0.8}
        >
          <LogOut size={16} color="#ffffff" />
          <Text style={styles.errorLogoutText}>Cerrar Sesión Expirada</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (loading) return <DashboardLoading />;
  
  // Estado Vacío (Sin trámites en base de datos)
  if (!requests || !requests.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 20, gap: 16 }}>
          <TouchableOpacity style={styles.inlineLogout} onPress={logout}>
            <LogOut size={14} color="#64748b" />
            <Text style={styles.inlineLogoutText}>Sign Out</Text>
          </TouchableOpacity>
          <DashboardEmpty 
            onBrowseProcedures={() => navigation.navigate("Procedures")} 
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        
        ListHeaderComponent={
          <View style={styles.headerGroup}>
            
            {/* Fila de Utilidades Superiores (Saludo + LogOut bajado del notch) */}
            <View style={styles.topBar}>
              <Text style={styles.welcomeText}>Hola, {user?.firstName || 'Estudiante'}</Text>
              <TouchableOpacity 
                style={styles.logoutIconButton} 
                onPress={logout}
                accessibilityLabel="Cerrar sesión"
              >
                <LogOut size={16} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Título de la sección limpio y sin saturación de botones */}
            <View style={styles.headerRow}>
              <View style={styles.titleWrapper}>
                <Text style={styles.mainTitle}>My Requests Dashboard</Text>
                <Text style={styles.subtitle}>
                  Track all your submitted procedure requests.
                </Text>
              </View>
            </View>

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
            onTrack={(id) => navigation.navigate("RequestTracking", { id })}
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
    backgroundColor: '#f8fafc',
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
    paddingBottom: 32,
  },
  headerGroup: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingTop: 10,
    paddingBottom: 12,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
  },
  logoutIconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleWrapper: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  separator: {
    height: 10,
  },
  errorLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  errorLogoutText: {
    color: '#ffffff',
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
    color: '#64748b',
    fontWeight: '500',
  }
});