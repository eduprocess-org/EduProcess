import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface FormFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
}

export default function FormField({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  onBlur, 
  error, 
  secureTextEntry, 
  keyboardType, 
  disabled 
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, error && styles.inputError, disabled && styles.disabled]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#cbd5e1"
          onBlur={onBlur}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType || 'default'}
          editable={!disabled}
          autoCapitalize="none"
        />
        {secureTextEntry && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => setShowPassword(!showPassword)}
            disabled={disabled}
          >
            {showPassword ? <EyeOff size={17} color="#94a3b8" /> : <Eye size={17} color="#94a3b8" />}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'column', marginBottom: 12 },
  label: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', color: '#64748b', letterSpacing: 0.5, marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    height: 48,
  },
  input: { flex: 1, fontSize: 14, color: '#334155' },
  inputError: { borderColor: '#fca5a5', backgroundColor: '#fef2f2' },
  disabled: { backgroundColor: '#f8fafc' },
  iconButton: { paddingLeft: 10 },
  errorText: { color: '#ef4444', fontSize: 12, marginTop: 4 },
});