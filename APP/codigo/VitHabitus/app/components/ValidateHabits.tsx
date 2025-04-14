import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  validate?: (text: string) => boolean;
  errorMessage?: string;
}

export default function ValidateHabits({
  label,
  value,
  onChangeText,
  placeholder,
  validate,
  errorMessage,
}: Props) {
  const isValid = validate ? validate(value) : true;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !isValid && styles.invalid]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {!isValid && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 16, marginBottom: 6, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  invalid: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
});
