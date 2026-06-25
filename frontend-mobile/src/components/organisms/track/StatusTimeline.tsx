// src/components/organisms/StatusTimeline.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListOrdered } from "lucide-react-native";
import { STATUS_CONFIG, STATUS_FALLBACK } from "../../../core/types/status.types"; 

interface TimelineItem {
  status: string;
  date: string;
  description: string;
}

interface StatusTimelineProps {
  timeline: TimelineItem[];
}

const getStatusConfigKey = (status: string): keyof typeof STATUS_CONFIG | null => {
  const normalized = status.trim().toUpperCase();
  if (normalized === "SUBMITTED") return "SUBMITTED";
  if (normalized === "UNDER REVIEW" || normalized === "PENDING") return "PENDING";
  if (normalized === "APPROVED") return "APPROVED";
  if (normalized === "REJECTED") return "REJECTED";
  return null;
};

const formatTimelineDate = (dateString: string): string => 
  dateString ? dateString.split("T")[0] : "";

export default function StatusTimeline({ timeline }: StatusTimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerIconWrapper}>
          <ListOrdered size={15} color="#854F0B" />
        </View>
        <Text style={styles.headerTitle}>Timeline</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{timeline.length} steps</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        {timeline.map((item, index) => {
          const configKey = getStatusConfigKey(item.status);
          const s = configKey ? STATUS_CONFIG[configKey] : STATUS_FALLBACK;
          
          const Icon = s.icon;
          const isLast = index === timeline.length - 1;
          const displayDate = formatTimelineDate(item.date);

          return (
            <View key={index} style={styles.stepRow}>
              <View style={styles.leftColumn}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: s.bg, borderColor: s.dot },
                  ]}
                >
                  <Icon size={15} color={s.text} />
                </View>
                {!isLast && (
                  <View style={[styles.verticalLine, { backgroundColor: s.dot }]} />
                )}
              </View>

              <View style={[styles.rightColumn, isLast && styles.pb0]}>
                <Text style={styles.statusText}>{s.labelText !== 'Unknown' ? s.labelText : item.status}</Text>
                {displayDate ? <Text style={styles.dateText}>{displayDate}</Text> : null}
                <Text style={styles.descriptionText}>{item.description}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    padding: 24,
    elevation: 1,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  headerIconWrapper: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#FAEEDA",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
  badge: {
    marginLeft: "auto",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#64748b",
  },
  listContainer: {
    flexDirection: "column",
  },
  stepRow: {
    flexDirection: "row",
    gap: 16,
  },
  leftColumn: {
    flexDirection: "column",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  verticalLine: {
    width: 2,
    flex: 1,
    minHeight: 28,
    marginTop: 4,
    opacity: 0.3,
  },
  rightColumn: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
    paddingBottom: 24,
  },
  pb0: {
    paddingBottom: 0,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
  },
  dateText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#94a3b8",
  },
  descriptionText: {
    marginTop: 2,
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
});