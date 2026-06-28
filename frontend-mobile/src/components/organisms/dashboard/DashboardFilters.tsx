// src/components/molecules/DashboardFilters.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Filter, ArrowUpDown } from 'lucide-react-native';
import FilterChip from '../../atoms/FilterChip';
import { STATUS_OPTIONS, SORT_OPTIONS } from '../../../core/types/filter.types';

interface DashboardFiltersProps {
  status: string;
  setStatus: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

export default function DashboardFilters({ status, setStatus, sort, setSort }: DashboardFiltersProps) {
  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <View style={styles.iconLabel}>
          <Filter size={14} color="#64748b" />
          <Text style={styles.filterTitle}>Status:</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
          {STATUS_OPTIONS.map((opt) => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              isActive={status === opt.value}
              onPress={() => setStatus(opt.value)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.filterRow}>
        <View style={styles.iconLabel}>
          <ArrowUpDown size={14} color="#64748b" />
          <Text style={styles.filterTitle}>Sort:</Text>
        </View>
        <View style={styles.chipsContainer}>
          {SORT_OPTIONS.map((opt) => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              isActive={sort === opt.value}
              onPress={() => setSort(opt.value)}
            />
          ))}
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
    width: 70, // Alineamiento perfecto en móviles
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
});