import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SearchX } from 'lucide-react-native'; 
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Button from '../../atoms/Button';

type RootStackParamList = {
  Procedures: undefined;
};

const { height: screenHeight } = Dimensions.get('window');

export default function RequestTrackingNotFound() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.centerWrapper}>
      <View style={styles.card}>
        
        <View style={styles.iconCircle}>
          <SearchX size={26} color="#94a3b8" />
        </View>

        <Text style={styles.title}>Tracking information not found</Text>

        <Text style={styles.subtitle}>
          The requested tracking information does not exist or may have been removed.
        </Text>

        <Button
          label="Back to Catalog"
          onPress={() => navigation.navigate("Procedures")}
          style={styles.catalogButton}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerWrapper: {
    minHeight: screenHeight * 0.6, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxWidth: 340, 
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    padding: 32,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f8fafc', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a', 
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748b', 
    textAlign: 'center',
    lineHeight: 20,
  },
  catalogButton: {
    marginTop: 24,
    width: '100%',
  },
});