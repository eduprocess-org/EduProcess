// src/components/shared/ControlledField.tsx
import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import FormField from '../../molecules/FormField'; 
import { KeyboardTypeOptions } from 'react-native';

interface ControlledFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
}

export default function ControlledField<T extends FieldValues>({ control, name, ...rest }: ControlledFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <FormField
          {...rest}
          value={value || ''}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
        />
      )}
    />
  );
}