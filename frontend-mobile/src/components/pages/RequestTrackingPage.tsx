import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshCw } from 'lucide-react-native'; // Usamos lucide-react-native

// Importación de todos los Organismos y la Molécula que migramos paso a paso
import RequestTrackingHeader from '../organisms/RequestTrackingHeader';
import StatusTimeline from '../organisms/StatusTimeline';
import AdministrativeComments from '../organisms/AdministrativeComments';
import RequestTrackingSkeleton from '../organisms/RequestTrackingSkeleton';
import RequestTrackingError from '../organisms/RequestTrackingError';
import RequestTrackingNotFound from '../organisms/RequestTrackingNotFound';

// Custom Hook de la capa Core / Hooks
import { useRequestTracking } from '../../../hooks/requests/useRequestTracking';

interface RequestTrackingPageProps {
  route: {
    params: {
      requestId?: string; // Captura el parámetro enviado desde la navegación nativa
    };
  };
}

export default function RequestTrackingPage({ route }: RequestTrackingPageProps) {
  // 🚀 Reemplazo estricto de useParams() por route.params de React Navigation
  const { requestId } = route.params ?? {};

  const { tracking, loading, error, refresh } = useRequestTracking(requestId ?? "");

  // Renderizado condicional de los organismos de estado (Fiel a tu lógica web)
  if (loading && !tracking) return <SafeAreaView style={styles.safeContainer}><RequestTrackingSkeleton /></SafeAreaView>;
  if (error) return <SafeAreaView style={styles.safeContainer}><RequestTrackingError message={error} /></SafeAreaView>;
  if (!tracking) return <SafeAreaView style={styles.safeContainer}><RequestTrackingNotFound /></SafeAreaView>;

  return (
    // Conserva los márgenes seguros en todas las direcciones contra notch y barras del sistema
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right', 'bottom']}>
      
      {/* 🚀 Top Action Row: Fila superior con el botón dinámico de Refresh */}
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

      {/* Contenedor con soporte de Scroll nativo para desplazar la UI cómodamente */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.layoutGroup}>
          
          {/* Organismo Encabezado */}
          <RequestTrackingHeader
            procedureName={tracking.procedureName}
            status={tracking.status}
            submissionDate={tracking.submissionDate}
            lastUpdateDate={tracking.lastUpdateDate}
          />

          {/* Organismo Línea de Tiempo */}
          <StatusTimeline timeline={tracking.timeline} />

          {/* Organismo Observaciones Administrativas */}
          <AdministrativeComments comments={tracking.administrativeComments} />

        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo limpio que engloba toda la página
  },
  topActionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  flexSpacer: {
    flex: 1, // Desplaza el botón hacia la extrema derecha simulando el justify-between + flex-1 web
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0', // border-slate-200
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  refreshButtonText: {
    fontSize: 12, // text-xs
    fontWeight: '500', // font-medium
    color: '#475569', // text-slate-600
  },
  disabledButton: {
    opacity: 0.5,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32, // Espaciado de seguridad ergonómico en la parte inferior de la pantalla
  },
  layoutGroup: {
    flexDirection: 'column',
    gap: 20, // Equivalente matemático al space-y-5 (20px) de Tailwind
  },
});