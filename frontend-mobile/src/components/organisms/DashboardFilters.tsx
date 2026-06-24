import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Filter, ArrowUpDown } from 'lucide-react-native';

interface DashboardFiltersProps {
  status: string;
  setStatus: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

export default function DashboardFilters({ status, setStatus, sort, setSort }: DashboardFiltersProps) {
  const statusOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Approved', value: 'APPROVED' },
    { label: 'Rejected', value: 'REJECTED' },
  ];

  const sortOptions = [
    { label: 'Newest', value: 'NEWEST' },
    { label: 'Oldest', value: 'OLDEST' },
  ];

  return (
    <View style={styles.container}>
      {/* Fila del Filtro de Estados */}
      <View style={styles.filterRow}>
        <View style={styles.iconLabel}>
          <Filter size={14} color="#64748b" />
          <Text style={styles.filterTitle}>Status:</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
          {statusOptions.map((opt) => {
            const isActive = status === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setStatus(opt.value)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Fila del Ordenamiento */}
      <View style={styles.filterRow}>
        <View style={styles.iconLabel}>
          <ArrowUpDown size={14} color="#64748b" />
          <Text style={styles.filterTitle}>Sort:</Text>
        </View>
        <View style={styles.chipsContainer}>
          {sortOptions.map((opt) => {
            const isActive = sort === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setSort(opt.value)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    padding: 12,
    gap: 12,
    width: '100%',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 70, // Ancho fijo para alinear los chips perfectamente
  },
  filterTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#EEF2FA',
    borderColor: '#b8c9e8',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  chipTextActive: {
    color: '#0B2D63',
    fontWeight: '600',
  },
});