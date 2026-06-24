import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from '../../components/organisms/LoginForm';
import { useAuthLogin } from '../hooks/useAuthLogin';

interface LoginPageProps {
  navigation: {
    replace: (screenName: string) => void;
  };
}


export default function LoginPage({ navigation }: LoginPageProps) {

  const handleNavigation = (role: string) => {
    if (role === 'admin') {
      navigation.replace('AdminDashboard');
    } else {
      navigation.replace('Home');
    }
  };

  const { control, handleSubmit, onSubmit, isLoading } = useAuthLogin(handleNavigation);

  return (
    <LinearGradient
      colors={['#0d2a5e', '#0B2D63', '#071d42']}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <View style={styles.brandContainer}>
          {/* <Image source={logo} style={styles.logo} /> */}
          <Text style={styles.brandText}>EduProcess</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.upperTitle}>Welcome back</Text>
            <Text style={styles.mainTitle}>Sign in to EduProcess</Text>
            <Text style={styles.subtitle}>Enter your credentials to continue</Text>
          </View>

          <LoginForm
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  brandContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 32 },
  logo: { width: 44, height: 44, borderRadius: 10, resizeMode: 'contain' },
  brandText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', width: '100%', maxWidth: 400, borderRadius: 24, padding: 28, elevation: 10 },
  headerTextContainer: { marginBottom: 24 },
  upperTitle: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', color: '#4A6FA5', marginBottom: 4, letterSpacing: 0.5 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#0B2D63', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: '#94a3b8', marginTop: 4 },
});