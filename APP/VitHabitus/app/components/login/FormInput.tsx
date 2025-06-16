import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  containerStyle?: object;
  labelStyle?: object;
  inputStyle?: object;
}

const FormInput = ({
  label,
  containerStyle,
  labelStyle,
  inputStyle,
  ...props
}: FormInputProps) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={[styles.inputLabel, labelStyle]}>{label}</Text>
      <TextInput
        style={[styles.inputControl, inputStyle]}
        placeholderTextColor="#6b7280"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#22',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
});
export default FormInput;