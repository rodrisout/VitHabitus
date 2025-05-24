import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ResultadoORI({ oriInicial, oriObjetivo }: { oriInicial: number, oriObjetivo: number }) {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  return (
    <View style={styles.resultadoBox}>
      <Text style={styles.resultadoTexto}>ORI actual: {oriInicial}</Text>
      <Text style={styles.resultadoTexto}>ORI objetivo: {oriObjetivo}</Text>

      <TouchableOpacity onPress={() => setMostrarInfo(prev => !prev)}>
        <Text style={styles.infoTitulo}>
          ¿Qué es ORI? {mostrarInfo ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {mostrarInfo && (
        <Text style={styles.infoDescripcion}>
          ORI (Índice de Riesgo de Obesidad) es un valor calculado a partir de tus hábitos actuales. Cuanto mayor sea, mayor es el riesgo estimado. Mejorar tus hábitos puede ayudarte a reducirlo.
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  resultadoBox: {
    padding: 16,
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    margin: 16,
    borderColor: '#075eec',
    borderWidth: 1,
  },
  resultadoTexto: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  infoTitulo: {
    color: '#075eec',
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 14,
    marginTop: 10,
  },
  infoDescripcion: {
    fontSize: 12,
    color: '#333',
    marginTop: 6,
  },
});