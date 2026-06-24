import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Control, UseFormHandleSubmit } from 'react-hook-form';
import { LoginFormData } from '../../core/utils/validators';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';


// src/components/organisms/LoginForm.tsx

interface LoginFormProps {
  control: any;
  handleSubmit: any; // Al usar any aquí, relajamos el contrato de la firma del evento web vs nativo
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

export default function LoginForm({ control, handleSubmit, onSubmit, isLoading }: LoginFormProps) {
  return (
    <View style={styles.form}>
      <FormField
        control={control}
        name="email"
        label="Email address"
        placeholder="user@uce.edu.ec"
        keyboardType="email-address"
        disabled={isLoading}
      />
      <FormField
        control={control}
        name="password"
        label="Password"
        placeholder="Your password"
        secureTextEntry
        disabled={isLoading}
      />
      <Button 
        label={isLoading ? "Authenticating..." : "Sign In"} 
        onPress={handleSubmit(onSubmit)} 
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { flexDirection: 'column', gap: 8 },
});