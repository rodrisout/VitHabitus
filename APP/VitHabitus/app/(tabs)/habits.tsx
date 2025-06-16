import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import AccordionSection from '../components/ui/AcordeonHabits';
import FormInput from '../components/login/FormInput';
import PickerComponent from '../components/ui/PickerComponent';
import habitFormStructure from '../data/formHabitsStructure';
import LoaderOverlay from '../components/ui/Loader';
import useAuthRedirect from '../components/login/authRedirect';

import { getRecomender } from '@/services/api/recomenderApi';
import { guardarHabitosEnFirestore } from '@/services/guardarHabitosFirebase';
import { cargarHabitosDesdeFirestore } from '@/services/cargarHabitosFirebase';
import { router } from 'expo-router';
import { useRecomendador } from '../components/global/RecomendadorContext';
import { leercampoBD } from '@/services/firebaseService';
import ConfirmModal from '../components/ui/ConfirmModalHabits';

export default function HabitsScreen() {

  useAuthRedirect();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ejecutando, setEjecutando } = useRecomendador();
 
  const buildInitialState = () => {
    const data: Record<string, any> = {};
    habitFormStructure.forEach((section) => {
      section.fields.forEach((field) => {
        data[field.key] = '';
      });
    });
    return data;
  };

  const [datos, setDatos] = useState<Record<string, string>>(buildInitialState());
  const [errores, setErrores] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [tipoDeCarga, setTipoDeCarga] = useState<"spinner" | "mensaje">("spinner");
  const [dots, setDots] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo, setModalTipo] = useState<'guardar' | 'recomendar' | 'en ejecucion' | null>(null);


  useEffect(() => {
    let interval: any;

    if (loading && tipoDeCarga === 'mensaje') {
      interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
      }, 500);
    }

    return () => clearInterval(interval);
  }, 
  [loading, tipoDeCarga]);

  const handleChange = (key: string, value: string) => {
    setDatos((prev) => {
      const updated= {...prev, [key]: value };
    
      if (key === 'fumador' && value === '0') {
        updated['fumadorConsumo'] = '0';
        updated['pipa'] = '0';
        updated['puros'] = '0';
      }
      if (key === 'fumador' && value === '1') {
        updated['exfumador'] = '0';
        updated['exfumadorNOSABE'] = '0';
        updated['exfumadorA'] = '0';
      }
      if (key === 'exfumador' && value === '1') {
        updated['fumador'] = '0';
        updated['fumadorConsumo'] = '0';
        updated['pipa'] = '0';
        updated['puros'] = '0';
      }
      else
      {
        updated['exfumadorA'] = '0';
        updated['exfumadorNOSABE'] = '0';
      }
      if (key === 'exfumadorNOSABE' && value === '0') {
        updated['exfumadorA'] = '0';
      }
      if (key === 'cancer' && value === '0') {
        
        updated['cancerMama'] = '0';
        updated['cancerColon'] = '0';
        updated['cancerProstata'] = '0';
        updated['cancerPulmon'] = '0';
        updated['cancerOtro'] = '0';
      }
  
      return updated;
    
    });

    setErrores((prev) => ({ ...prev, [key]: false }));
  };

  const validateHabits = () => {
    const nuevosErrores: Record<string, boolean> = {};
    let tieneErrores = false;

    habitFormStructure.forEach((section) => {
      section.fields.forEach((field) => {
        const value = datos[field.key];
        if (!value || (field.type === 'numeric' && isNaN(Number(value)))) {
          nuevosErrores[field.key] = true;
          tieneErrores = true;
        }
      });
    });

    setErrores(nuevosErrores);
    return !tieneErrores;
  };

  const handleGuardar = async () => {
    const esValido = validateHabits();
    if (!esValido) {
      Alert.alert('Faltan datos', 'Revisa los campos marcados en rojo.');
      return;
    }

    if (ejecutando) {
      setModalTipo('guardar');
      setModalVisible(true);
    } else {
      guardarHabitosConfirmado();
      }
  };

  const guardarHabitosConfirmado = async () => {
    setTipoDeCarga("spinner");
    setLoading(true);

    try {
      await guardarHabitosEnFirestore(datos);
      Alert.alert('¡Guardado!', 'Tus hábitos han sido registrados correctamente.');
    } catch (error) {
      console.error('Error al guardar:', error);
      Alert.alert('Error', 'No se pudo guardar la información.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecomendar = async () => {
    const esValido = validateHabits();
    if (!esValido) {
      Alert.alert('Faltan datos', 'Revisa los campos marcados en rojo.');
      return;
    }

    try {

      let recomendacionesPrevias = null;
      try {
        recomendacionesPrevias = await leercampoBD('habitos/recomendacion');
      } catch (error) {
       
        recomendacionesPrevias = null;
      }

      const yaHayRecomendaciones = recomendacionesPrevias && Object.keys(recomendacionesPrevias).length > 0;

      if (yaHayRecomendaciones) {
        setModalTipo('recomendar');
        setModalVisible(true);
      }
      else {
        ejecutarRecomendador();
      }
      if(ejecutando) {
        setModalTipo('en ejecucion');
        setModalVisible(true);
      }
      
    } catch (error) {
      console.error('Error al comprobar recomendaciones previas:', error);
      Alert.alert('Error', 'Hubo un problema al comprobar si ya existen recomendaciones.');
    }
  };

  const ejecutarRecomendador = async () => {
    setTipoDeCarga('mensaje');
    setLoading(true);
    setDots('');
    setEjecutando(true); // para activar la notificación global

    try {
      const { ori_inicial, ori_objetivo } = await getRecomender();

      Alert.alert(
        'Valoración ORI de hábitos',
        `ORI actual: ${ori_inicial}\nORI objetivo: ${ori_objetivo}`,
        [
          {
            text: '¿Qué es ORI?',
            onPress: () => {
              Alert.alert(
                '¿Qué es ORI?',
                'El ORI (Índice de Riesgo de Obesidad) estima tu riesgo de obesidad en base a tus hábitos actuales. Cuanto más bajo, mejor.',
                [
                  {
                    text: 'Ver resultados',
                    onPress: () => router.push('/results'),
                  },
                  {
                    text: 'Entendido',
                    style: 'cancel',
                  },
                ]);},},
          {
            text: 'Ver resultados',
            onPress: () => router.push('/results'),
          },
        ]
      );
    } catch (error) {
      console.error('Error completo:', error);
      Alert.alert('Error', 'No se pudieron obtener recomendaciones.');
      setEjecutando(false); 
    } finally {
      setLoading(false);
      setEjecutando(false);
    }
  };

  const cargarDatos = async () => {
    setTipoDeCarga("spinner");
    setLoading(true);
    try {

      const datosGuardados = await cargarHabitosDesdeFirestore();
    
      setDatos((prev) => ({
        ...prev,
        ...datosGuardados,
      }));

        Alert.alert('Éxito', 'Datos cargados correctamente.');
    } catch (error) {
      console.error('Error al cargar datos:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos.');
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ConfirmModal
        visible={modalVisible}
        tipo={modalTipo}
        onCancelar={() => setModalVisible(false)}
        onConfirmar={() => {
          setModalVisible(false);
          if (modalTipo === 'guardar') guardarHabitosConfirmado();
          else if (modalTipo === 'recomendar') ejecutarRecomendador();
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.loadBtn} onPress={cargarDatos}>
        <Text style={styles.loadText}>Cargar datos anteriores</Text>
        </TouchableOpacity>

        {habitFormStructure.map((section, index) => (
          <AccordionSection
            key={section.key}
            title={section.title}
            expanded={activeIndex === index}
            onToggle={() => setActiveIndex((prev) => (prev === index ? null : index))}
          >
            {section.fields.map((field) => {
              const value = datos[field.key];
              const isError = errores[field.key];

              if (field.key.startsWith('cancer') && field.key !== 'cancer' && datos['cancer'] !== '1') {
                return null;
              }
              const esCampoTabaco = ['fumadorConsumo', 'pipa', 'puros'].includes(field.key);
              if (esCampoTabaco && (datos['fumador'] !== '1' && datos['exfumador'] !== '1')) {
                return null;
              }
              
              else if((field.key.startsWith('ex')) && datos['fumador'] === '1') {
                return null;
              }
              else if( datos['exfumador'] === '1') {
                if(esCampoTabaco)
                  return null;
              }
            
              if (field.type === 'picker' || field.options) {
                return (
                  <PickerComponent
                    key={field.key}
                    label={field.label}
                    selectedValue={value}
                    onValueChange={(val) => handleChange(field.key, val)}
                    data={field.options ?? []}
                    pickerStyle={isError ? { borderColor: 'red' } : {}}
                  />
                );
              }

              return (
                <FormInput
                  key={field.key}
                  label={field.label}
                  value={value}
                  onChangeText={(text) => handleChange(field.key, text)}
                  placeholder="Escribe aquí..."
                  keyboardType={field.type === 'numeric' ? 'numeric' : 'default'}
                  inputStyle={isError ? { borderColor: 'red' } : {}}
                />
              );
            })}
          </AccordionSection>
        ))}

        <TouchableOpacity style={styles.saveBtn} onPress={handleGuardar}>
          <Text style={styles.saveText}>Guardar hábitos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.recommenderBtn} onPress={handleRecomendar}>
          <Text style={styles.recommenderText}>Ejecutar Recomendador</Text>
        </TouchableOpacity>
      </ScrollView>
      {loading && tipoDeCarga === "mensaje" && (
        <View style={styles.progressOverlay}>
          <Text style={styles.mensajeSuperior}>Puede tardar unos minutos</Text>
          <Text style={styles.mensajeInferior}>Calculando{dots}</Text>
          <TouchableOpacity
            style={styles.botonSalirOverlay}
            onPress={() => {
              setLoading(false); 
              setEjecutando(true); 
            }}
          >
            <Text style={styles.textoSalirOverlay}>Salir y continuar</Text>
          </TouchableOpacity>
        </View>
      )}
      {loading && tipoDeCarga === "spinner" && (
        <LoaderOverlay />
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#f0f8ff"
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
  loadBtn: {
    marginBottom: 16,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 10,
  },
  loadText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 10,
  },
  recommenderBtn: {
    marginTop: 12,
    backgroundColor: '#6f42c1',
    paddingVertical: 12,
    borderRadius: 10,
  },
  recommenderText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  progressOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  mensajeSuperior: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600',
  },

  mensajeInferior: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
//mensaje recomendador
  infoText: {
    color: '#007bff',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },

/// Boton carga-salir
  botonSalirOverlay: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  textoSalirOverlay: {
    color: '#333',
    fontSize: 15,
    fontWeight: '600',
  },
});
