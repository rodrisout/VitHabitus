import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import AccordionSection from '../components/AcordeonHabits';
import FormInput from '../components/login/FormInput';
import PickerComponent from '../components/PickerComponent';
import habitFormStructure from '../data/formHabitsStructure';
import LoaderOverlay from '../components/ui/Loader';
import useAuthRedirect from '../components/login/authRedirect';

//base de datos
import { db } from '../../services/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


export default function HabitsScreen() {
  useAuthRedirect();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  //inicio
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

  const handleChange = (key: string, value: string) => {
    setDatos((prev) => {
      const updated= {...prev, [key]: value };
    
      if (key === 'fumador' && value === '0') {
        updated['fuma_cigarrillos'] = '0';
        updated['fuma_pipa'] = '0';
        updated['fuma_puros'] = '0';
      }
      if (key === 'fumador' && value === '1') {
        updated['exfumador'] = '0';
        updated['ex_desconocer'] = '0';
        updated['ex_sinfumar'] = '0';
      }
      if (key === 'exfumador' && value === '1') {
        updated['fumador'] = '0';
        updated['fuma_cigarrillos'] = '0';
        updated['fuma_pipa'] = '0';
        updated['fuma_puros'] = '0';
      }
      else
      {
        updated['ex_sinfumar'] = '0';
        updated['ex_desconocer'] = '0';
      }
      if (key === 'ex_desconocer' && value === '0') {
        updated['ex_sinfumar'] = '0';
      }
      if (key === 'cancer' && value === '0') {
        
        updated['cancer_mama'] = '0';
        updated['cancer_colon'] = '0';
        updated['cancer_prostata'] = '0';
        updated['cancer_pulmon'] = '0';
        updated['cancer_otro'] = '0';
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
    setLoading(true);
    try {
      const user = getAuth().currentUser;
      if (!user) {
        Alert.alert('Error', 'No se encontró un usuario autenticado.');
        setLoading(false);
        return;
      }

      const docRef = doc(db, 'usuarios', user.uid, 'habitos', 'formulario');
      await setDoc(docRef, {
        ...datos,
        timestamp: new Date().toISOString()
      });

      Alert.alert('¡Guardado!', 'Tus hábitos han sido registrados correctamente.');
      console.log('✅ Guardado en Firestore:', datos);
    } catch (error) {
      console.error('Error al guardar:', error);
      Alert.alert('Error', 'No se pudo guardar la información.');
    }
    finally{
      setLoading(false);
    }
  };

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const user = getAuth().currentUser;
      if (!user) {
        Alert.alert('Error', 'Usuario no autenticado.');
        setLoading(false);
        return;
      }
  
      const docRef = doc(db, 'usuarios', user.uid, 'habitos', 'formulario');
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const datosGuardados = docSnap.data();
        delete datosGuardados.timestamp; // opcional
  
        setDatos((prev) => ({
          ...prev,
          ...datosGuardados
        }));
  
        Alert.alert('Éxito', 'Datos cargados correctamente.');
      } else {
        Alert.alert('Sin datos', 'No se encontraron hábitos guardados.');
      }
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

            if (field.key.startsWith('cancer_') && datos['cancer'] !== '1') {
              return null;
            }

            
            if ((field.key.startsWith('fuma_')||field.key.startsWith('ex_')) && datos['fumador'] !== '1' && datos['exfumador'] !== '1' ) {
              return null;
            }
            else if((field.key.startsWith('ex_')) && datos['fumador'] === '1') {
              return null;
            }
            else if( datos['exfumador'] === '1') {
              if(field.key.startsWith('fuma_'))
                return null;
              if(field.key== ('ex_sinfumar') && datos['ex_desconocer'] === '0')
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
    </ScrollView>
    {loading && <LoaderOverlay />}
  </View>
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
});
