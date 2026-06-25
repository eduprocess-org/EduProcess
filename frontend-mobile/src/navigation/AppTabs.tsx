import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LayoutDashboard, FileText, Search, Bell, LogOut } from 'lucide-react-native';
import { COLORS } from '../core/theme/colors';

// 🚀 Importaciones añadidas de marca y sesión global
import { AppBrandHeader } from '../components/molecules/AppBrandHeader'; 
import { useAuth } from '../core/context/AuthContext';

// 🚀 Tu página real
import StudentDashboardPage from '../components/pages/DashboardPage';

// 🚧 Mocks temporales para pruebas de QA
function ProceduresCatalogPage() {
  return (
    <View style={styles.center}>
      <Text style={styles.mockText}>Catalog of Procedures (Coming Soon)</Text>
    </View>
  );
}

function SearchProceduresPage() {
  return (
    <View style={styles.center}>
      <Text style={styles.mockText}>Academic Procedures Search (Coming Soon)</Text>
    </View>
  );
}

function NotificationsPage() {
  return (
    <View style={styles.center}>
      <Text style={styles.mockText}>Notifications (Coming Soon)</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth(); // 🚀 Consumo del estado global de cierre de sesión

  // 🎨 Identidad visual EduProcess (Paleta UCE)
  const ACTIVE_COLOR = '#0B2D63';         // Azul institucional
  const ACTIVE_BG = 'rgba(11, 45, 99, 0.1)'; // Fondo sutil para la píldora activa
  const BADGE_COLOR = '#EF4444';          // Rojo para las alertas académicas

  return (
    <Tab.Navigator
      screenOptions={{
        // 🚀 HEADER GLOBAL COMPARTIDO: Visible en cada pestaña
        headerShown: true,
        headerTitle: () => <AppBrandHeader />,
        headerTitleAlign: 'left',
        headerRight: () => (
          <TouchableOpacity 
            style={styles.logoutIconButton} 
            onPress={logout}
            activeOpacity={0.7}
            accessibilityLabel="Cerrar sesión"
          >
            <LogOut size={16} color={COLORS.textMuted} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
          elevation: 0,      // Elimina línea de sombra dura en Android
          shadowOpacity: 0,  // Elimina línea de sombra dura en iOS
        },
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
        headerRightContainerStyle: {
          paddingRight: 20,
        },
        tabBarActiveTintColor: '#0B2D63',     // Texto azul al estar activo
        tabBarInactiveTintColor: '#64748b',   // Gris para las pestañas inactivas
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9',
          height: 68 + (insets.bottom > 0 ? insets.bottom : 10),
          paddingBottom: insets.bottom > 0 ? insets.bottom + 6 : 12,
          paddingTop: 8,
          elevation: 10,
        },
      }}
    >
      {/* 📊 Pestaña 1: Dashboard */}
      <Tab.Screen 
        name="Dashboard" 
        component={StudentDashboardPage} 
        options={{
          tabBarLabel: 'Home', 
          tabBarIcon: ({ focused, color }: any) => (
            <View style={[styles.iconWrapper, focused && { backgroundColor: ACTIVE_BG }]}>
              <LayoutDashboard size={22} color={focused ? ACTIVE_COLOR : color} />
            </View>
          ),
        }}
      />

      {/* 📄 Pestaña 2: Trámites */}
      <Tab.Screen 
        name="Procedures" 
        component={ProceduresCatalogPage} 
        options={{
          tabBarLabel: 'Procedures',
          tabBarIcon: ({ focused, color }: any) => (
            <View style={[styles.iconWrapper, focused && { backgroundColor: ACTIVE_BG }]}>
              <FileText size={22} color={focused ? ACTIVE_COLOR : color} />
            </View>
          ),
        }}
      />

      {/* 🔍 Pestaña 3: Búsqueda */}
      <Tab.Screen 
        name="Search" 
        component={SearchProceduresPage} 
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused, color }: any) => (
            <View style={[styles.iconWrapper, focused && { backgroundColor: ACTIVE_BG }]}>
              <Search size={22} color={focused ? ACTIVE_COLOR : color} />
            </View>
          ),
        }}
      />

      {/* 🔔 Pestaña 4: Notificaciones */}
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsPage} 
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ focused, color }: any) => (
            <View style={[styles.iconWrapper, focused && { backgroundColor: ACTIVE_BG }]}>
              <Bell size={22} color={focused ? ACTIVE_COLOR : color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  mockText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B2D63',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748b',
  },
  logoutIconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.border,
  },
  iconWrapper: {
    width: 64,
    height: 32,
    borderRadius: 16, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});