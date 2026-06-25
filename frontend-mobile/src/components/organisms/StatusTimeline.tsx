import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Send, Clock, CheckCircle, XCircle, ListOrdered } from "lucide-react-native";
import { COLORS } from "../../core/theme/colors";

interface TimelineItem {
  status: string;
  date: string;
  description: string;
}

interface Props {
  timeline: TimelineItem[];
}

// Mapeo exacto de tu configuración web trasladado a constantes de estilo nativas
const stepConfig: Record<
  string,
  { icon: React.ElementType; iconBg: string; iconColor: string; dotColor: string; lineColor: string }
> = {
  Submitted: {
    icon: Send,
    iconBg: "#EEF2FA",
    iconColor: "#0B2D63",
    dotColor: "#0B2D63",
    lineColor: "#0B2D63",
  },
  "Under Review": {
    icon: Clock,
    iconBg: "#FAEEDA",
    iconColor: "#854F0B",
    dotColor: "#EF9F27",
    lineColor: "#EF9F27",
  },
  Approved: {
    icon: CheckCircle,
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    dotColor: "#1D9E75",
    lineColor: "#1D9E75",
  },
  Rejected: {
    icon: XCircle,
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
    dotColor: "#E24B4A",
    lineColor: "#E24B4A",
  },
};

const fallback = {
  icon: Clock,
  iconBg: "#f1f5f9",
  iconColor: "#64748b",
  dotColor: "#cbd5e1",
  lineColor: "#e2e8f0",
};

export default function StatusTimeline({ timeline }: Props) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIconWrapper}>
          <ListOrdered size={15} color="#854F0B" />
        </View>
        <Text style={styles.headerTitle}>Timeline</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{timeline.length} steps</Text>
        </View>
      </View>

      {/* Steps List */}
      <View style={styles.listContainer}>
        {timeline.map((item, index) => {
          const s = stepConfig[item.status] ?? fallback;
          const Icon = s.icon;
          const isLast = index === timeline.length - 1;

          // Formateo rápido por si la fecha viene con la "T" del backend
          const displayDate = item.date ? item.date.split("T")[0] : "";

          return (
            <View key={index} style={styles.stepRow}>
              {/* Left: Icon + Vertical Connector Line */}
              <View style={styles.leftColumn}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: s.iconBg, borderColor: s.dotColor },
                  ]}
                >
                  <Icon size={15} color={s.iconColor} />
                </View>
                {!isLast && (
                  <View style={[styles.verticalLine, { backgroundColor: s.lineColor }]} />
                )}
              </View>

              {/* Right: Content */}
              <View style={[styles.rightColumn, isLast && styles.pb0]}>
                <Text style={styles.statusText}>{item.status}</Text>
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