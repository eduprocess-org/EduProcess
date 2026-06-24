import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';

// Lógica y Datos (Capa Core)
import { useStudentRequests } from '../../core/hooks/useStudentRequests';

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
  // Consumo del Hook Lógico del Commit 3
  const { requests, loading, error } = useStudentRequests();

  // Estados locales de filtrado idénticos a tu versión web
  const [status, setStatus] = useState<string>("ALL");
  const [sort, setSort] = useState<string>("NEWEST");

  // Filtrado y ordenamiento optimizado en memoria para dispositivos móviles
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

  // Renderizados condicionales según el estado de la UI
  if (loading) return <DashboardLoading />;
  if (error) return <DashboardError message={error} />;
  
  // Si no hay trámites en absoluto, disparamos el organismo vacío pasándole el callback nativo
  if (!requests || !requests.length) {
    return (
      <DashboardEmpty 
        onBrowseProcedures={() => navigation.navigate("Procedures")} 
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        
        // Agrupamos la cabecera completa dentro de la FlatList para evitar conflictos de scroll
        ListHeaderComponent={
          <View style={styles.headerGroup}>
            
            {/* Título de la sección y botón de acción */}
            <View style={styles.headerRow}>
              <View style={styles.titleWrapper}>
                <Text style={styles.mainTitle}>My Requests Dashboard</Text>
                <Text style={styles.subtitle}>
                  Track all your submitted procedure requests.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.newRequestButton}
                onPress={() => navigation.navigate("Procedures")}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Create a new procedure request"
              >
                <Plus size={14} color="#ffffff" />
                <Text style={styles.buttonText}>New Request</Text>
              </TouchableOpacity>
            </View>

            {/* Organismo: Tarjetas cuantitativas */}
            <DashboardSummary requests={requests} />

            {/* Organismo: Filtros interactivos */}
            <DashboardFilters
              status={status}
              setStatus={setStatus}
              sort={sort}
              setSort={setSort}
            />

          </View>
        }
        
        // Renderizado molecular de cada trámite inyectando las acciones nativas
        renderItem={({ item }) => (
          <RequestCard 
            request={item} 
            onTrack={(id) => navigation.navigate("RequestTracking", { id })}
            onView={(procedureId) => navigation.navigate("ProcedureDetails", { procedureId })}
          />
        )}
        
        // Separador vertical limpio entre celdas
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
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerGroup: {
    flexDirection: 'column',
    gap: 20,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  titleWrapper: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  newRequestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0B2D63',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  separator: {
    height: 10,
  },
});