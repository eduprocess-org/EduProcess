import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from '../organisms/auth/LoginForm'; // O tu ruta exacta actual
import { useAuthLogin } from '../../core/hooks/useAuthLogin';
import { COLORS } from '../../core/theme/colors';

export default function LoginPage() {
  const handleSuccess = () => {
  };

  const { onSubmit } = useAuthLogin(handleSuccess);

  const handleLoginSubmit = async (data: any) => {
    await onSubmit(data);
  };

  return (
    <LinearGradient
      colors={['#0d2a5e', COLORS.primary || '#0B2D63', '#071d42']}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>EduProcess</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.upperTitle}>Welcome back</Text>
            <Text style={styles.mainTitle}>Sign in to EduProcess</Text>
            <Text style={styles.subtitle}>Enter your credentials to continue</Text>
          </View>

          <LoginForm onSubmit={handleLoginSubmit} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  brandContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 32 },
  brandText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', width: '100%', maxWidth: 400, borderRadius: 24, padding: 28, elevation: 10 },
  headerTextContainer: { marginBottom: 24 },
  upperTitle: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', color: '#4A6FA5', marginBottom: 4, letterSpacing: 0.5 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary || '#0B2D63', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: '#94a3b8', marginTop: 4 },
});