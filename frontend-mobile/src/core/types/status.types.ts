import { Clock, CheckCircle, XCircle, Send } from 'lucide-react-native';

export const STATUS_CONFIG = {
  SUBMITTED: {
    icon: Send,
    bg: "#EEF2FA",
    border: "#b8c9e8",
    text: "#0B2D63",
    dot: "#0B2D63",
    labelText: 'Submitted',
  },
  PENDING: {
    icon: Clock,
    bg: '#FAEEDA',
    border: '#FAC775',
    text: '#854F0B',
    dot: '#EF9F27',
    labelText: 'Under Review',
  },
  APPROVED: {
    icon: CheckCircle,
    bg: '#E1F5EE',
    border: '#9FE1CB',
    text: '#0F6E56',
    dot: '#1D9E75',
    labelText: 'Approved',
  },
  REJECTED: {
    icon: XCircle,
    bg: '#FCEBEB',
    border: '#F7C1C1',
    text: '#A32D2D',
    dot: '#E24B4A',
    labelText: 'Rejected',
  },
};

export const STATUS_FALLBACK = {
  icon: Send,
  bg: "#f1f5f9",
  border: "#e2e8f0",
  text: "#475569",
  dot: "#94a3b8",
  labelText: 'Unknown',
};