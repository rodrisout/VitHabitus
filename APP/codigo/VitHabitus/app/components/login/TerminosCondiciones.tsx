import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Terminos() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#075eec" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Términos y Condiciones</Text>
        
        <Text style={styles.paragraph}>
          Esta aplicación tiene como objetivo ayudarte a adquirir hábitos saludables. 
          Sin embargo, no sustituye consejos médicos profesionales. No nos hacemos responsables 
          de decisiones tomadas basadas exclusivamente en la información proporcionada.
        </Text>

        <Text style={styles.paragraph}>
          Al registrarte, aceptas que los datos sean tratados según nuestra política de privacidad.
          El uso de esta aplicación implica la aceptación de estos términos. 
          Siempre consulta con un profesional de la salud antes de realizar cambios importantes.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
    textAlign: 'justify',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 6,
    color: '#075eec',
    fontSize: 16,
    fontWeight: '600',
  },
});