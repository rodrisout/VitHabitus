import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import AccordionSection from '../components/AcordeonHabits';
import FormInput from '../components/login/FormInput';
import PickerComponent from '../components/PickerComponent';

const categorias = [
  'Información general',
  'Uso de tabaco',
  'Información dietética',
  'Alcohol',
  'Información médica',
  'Actividad física',
];

const niveles = [
  { label: 'Bajo', value: 'bajo' },
  { label: 'Medio', value: 'medio' },
  { label: 'Alto', value: 'alto' },
];

export default function HabitsScreen() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [datos, setDatos] = useState<Record<string, { texto: string; nivel: string }>>(
    categorias.reduce((acc, cat) => {
      acc[cat] = { texto: '', nivel: '' };
      return acc;
    }, {} as Record<string, { texto: string; nivel: string }>)
  );

  const [errores, setErrores] = useState<Record<string, { texto?: boolean; nivel?: boolean }>>({});

  const toggleSection = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const handleChange = (categoria: string, campo: 'texto' | 'nivel', valor: string) => {
    setDatos(prev => ({
      ...prev,
      [categoria]: {
        ...prev[categoria],
        [campo]: valor,
      },
    }));

    // Limpia errores al escribir
    setErrores(prev => ({
      ...prev,
      [categoria]: {
        ...prev[categoria],
        [campo]: false,
      },
    }));
  };

  const validateHabits = () => {
    const nuevosErrores: Record<string, { texto?: boolean; nivel?: boolean }> = {};
    let tieneErrores = false;

    categorias.forEach((cat) => {
      const campo = datos[cat];
      nuevosErrores[cat] = {};

      if (!campo.texto || campo.texto.trim().length < 10) {
        nuevosErrores[cat].texto = true;
        tieneErrores = true;
      }

      if (!campo.nivel) {
        nuevosErrores[cat].nivel = true;
        tieneErrores = true;
      }
    });

    setErrores(nuevosErrores);
    return !tieneErrores;
  };

  const handleGuardar = () => {
    const esValido = validateHabits();

    if (!esValido) {
      Alert.alert('Faltan datos', 'Revisa las secciones marcadas en rojo.');
      return;
    }

    console.log('✅ Hábitos listos:', datos);
    Alert.alert('¡Guardado!', 'Tus hábitos han sido registrados correctamente.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Tus hábitos</Text>

      {categorias.map((categoria, index) => (
        <AccordionSection
          key={index}
          title={categoria}
          expanded={activeIndex === index}
          onToggle={() => toggleSection(index)}
        >
          <FormInput
            label={`Describe tu hábito de ${categoria.toLowerCase()}`}
            value={datos[categoria].texto}
            onChangeText={(texto) => handleChange(categoria, 'texto', texto)}
            placeholder="Escribe aquí..."
            inputStyle={errores[categoria]?.texto ? { borderColor: 'red' } : {}}
          />
          {errores[categoria]?.texto && (
            <Text style={styles.error}>Debe tener al menos 10 caracteres.</Text>
          )}

          <PickerComponent
            label={`Nivel de ${categoria.toLowerCase()}`}
            selectedValue={datos[categoria].nivel}
            onValueChange={(nivel) => handleChange(categoria, 'nivel', nivel)}
            data={niveles}
            pickerStyle={errores[categoria]?.nivel ? { borderColor: 'red' } : {}}
          />
          {errores[categoria]?.nivel && (
            <Text style={styles.error}>Selecciona un nivel válido.</Text>
          )}
        </AccordionSection>
      ))}

      <TouchableOpacity style={styles.saveBtn} onPress={handleGuardar}>
        <Text style={styles.saveText}>Guardar hábitos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  saveBtn: {
    marginTop: 24,
    backgroundColor: '#075eec',
    paddingVertical: 14,
    borderRadius: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 10,
  },
});
