import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker} from '@react-native-picker/picker';

interface PickerComponentProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  data: { label: string; value: string }[];
  pickerStyle?: object;
}

export default function PickerComponent({
  label,
  selectedValue,
  onValueChange,
  data,
  pickerStyle,
}: PickerComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, pickerStyle]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor="#1D2A32"
        >
          <Picker.Item label={`Selecciona ${label.toLowerCase()}...`} value="" />
          {data.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1D2A32',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 12,
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? 200 : 54,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  picker: {
    height: '100%',
    width: '100%',
    color: '#1D2A32',
  },
});