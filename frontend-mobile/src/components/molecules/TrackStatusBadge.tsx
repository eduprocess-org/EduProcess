import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RequestStatus } from "../../core/types/studentDashboard.types";
import { STATUS_CONFIG, STATUS_FALLBACK } from "../../core/types/status.types";

interface StatusBadgeProps {
  status: RequestStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status?.toUpperCase();
  const s = STATUS_CONFIG[normalizedStatus as keyof typeof STATUS_CONFIG] ?? STATUS_FALLBACK;
  const Icon = s.icon;

  return (
    <View style={[styles.badgeContainer, { backgroundColor: s.bg, borderColor: s.border }]}>
      <View style={[styles.dot, { backgroundColor: s.dot }]} />
      <Icon size={12} color={s.text} />
      <Text style={[styles.badgeText, { color: s.text }]}>
        {s.labelText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});