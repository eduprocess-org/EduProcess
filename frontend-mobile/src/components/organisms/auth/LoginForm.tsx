import React from 'react';
import { View, StyleSheet } from 'react-native';
import ControlledField from '../../organisms/auth/ControlledField'; 
import Button from '../../atoms/Button';
import { useLoginForm } from '../../../core/hooks/useLoginForm';


interface LoginFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const { control, handleFormSubmit, isLoading } = useLoginForm({ onSubmit });

  return (
    <View style={styles.form}>
      <ControlledField
        control={control}
        name="email"
        label="Email address"
        placeholder="user@uce.edu.ec"
        keyboardType="email-address"
        disabled={isLoading}
      />
      <ControlledField
        control={control}
        name="password"
        label="Password"
        placeholder="Your password"
        secureTextEntry
        disabled={isLoading}
      />
      <Button 
        label={isLoading ? "Authenticating..." : "Sign In"} 
        onPress={handleFormSubmit} 
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { flexDirection: 'column', gap: 8 },
});