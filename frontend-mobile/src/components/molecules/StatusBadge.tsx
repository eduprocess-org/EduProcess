import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Clock, CheckCircle, XCircle, Send } from "lucide-react-native"; // Usamos lucide-react-native

interface Props {
  status: string;
}

// Configuración de estilos tipados traduciendo los colores hexadecimales exactos de la web
const config: Record<
  string,
  {
    icon: React.ElementType;
    bg: string;
    border: string;
    text: string;
    dot: string;
  }
> = {
  Submitted: {
    icon: Send,
    bg: "#EEF2FA",
    border: "#b8c9e8",
    text: "#0B2D63",
    dot: "#0B2D63",
  },
  "Under Review": {
    icon: Clock,
    bg: "#FAEEDA",
    border: "#FAC775",
    text: "#854F0B",
    dot: "#EF9F27",
  },
  Approved: {
    icon: CheckCircle,
    bg: "#E1F5EE",
    border: "#9FE1CB",
    text: "#0F6E56",
    dot: "#1D9E75",
  },
  Rejected: {
    icon: XCircle,
    bg: "#FCEBEB",
    border: "#F7C1C1",
    text: "#A32D2D",
    dot: "#E24B4A",
  },
};

const fallback = {
  icon: Send,
  bg: "#f1f5f9",
  border: "#e2e8f0",
  text: "#475569",
  dot: "#94a3b8",
};

export default function StatusBadge({ status }: Props) {
  const s = config[status] ?? fallback;
  const Icon = s.icon;

  return (
    <View style={[styles.badgeContainer, { backgroundColor: s.bg, borderColor: s.border }]}>
      {/* Indicador Atómico (Punto de Color) */}
      <View style={[styles.dot, { backgroundColor: s.dot }]} />
      
      {/* Icono de Estado */}
      <Icon size={12} color={s.text} />
      
      {/* Texto del Estado */}
      <Text style={[styles.badgeText, { color: s.text }]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // inline-flex gap-2
    borderWidth: 1,
    borderRadius: 100, // rounded-full
    paddingHorizontal: 14, // px-3.5
    paddingVertical: 6, // py-1.5
    alignSelf: "flex-start", // 🚀 Crucial en móvil para emular 'inline-flex'
  },
  dot: {
    width: 6, // h-1.5
    height: 6, // w-1.5
    borderRadius: 3, // rounded-full
  },
  badgeText: {
    fontSize: 12, // text-xs
    fontWeight: "600", // font-semibold
  },
});