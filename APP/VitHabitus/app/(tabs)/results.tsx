import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import useAuthRedirect from '../components/login/authRedirect';
import CFOGauge from '../components/ui/Cfomedidor';
import { useCallback, useEffect, useState } from 'react';
import { leercampoBD } from '@/services/firebaseService';
import RecomendacionEditable from '../components/ui/RecomendacionEditable';
import { guardarHabitosEnFirestore } from '@/services/guardarHabitosFirebase';
import { evaluateOriApi } from '@/services/api/evaluateOriApi';
import { router, useFocusEffect } from 'expo-router';
import { guardarORIHistorial } from '@/services/guardarHistorialOri';
import habitLabels from '../data/habitLabel';
import { useRecomendador } from '../components/global/RecomendadorContext';
import ConfirmModal from '../components/ui/ConfirmModalHabits';
import LoaderOverlay from '../components/ui/Loader';

export default function ResultsrScreen() {
  useAuthRedirect();  
  const [ori, setOri] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [mostrarInfo, setMostrarInfo] = useState(false);
  const [oriObjetivo, setOriObjetivo] = useState<number | null>(null);
  const [noHayRecomendaciones, setNoHayRecomendaciones] = useState(false);
  const [recomendaciones, setRecomendaciones] = useState<
  { id: string, nombre: string; original: number; recomendado: number; valor: number }[]>([]);
  const [originalHabits, setOriginalHabits] = useState<Record<string, string>>({});
  const { ejecutando } = useRecomendador();
  const [modalVisible, setModalVisible] = useState(false);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [actualizando, setActualizando] = useState(false);

  const cargarORI = async () => {
    try {
      const valor = await leercampoBD('habitos/valor/ORI');
      setOri(valor);
    } catch (error) {
      console.log('Error al leer ORI, puede que todavia no existan datos', error);
      setOri(0); 
    }
  };

  const cargarRecomendaciones = async () => {
    try {
      const recomendacionesData = await leercampoBD('habitos/recomendacion');
      const habitosActuales = await leercampoBD('habitos/formulario'); 

      const valoresOriginales: Record<string, string> = {};
        Object.keys(habitosActuales).forEach(key => {
          valoresOriginales[key] = String(habitosActuales[key]);
        });
      setOriginalHabits(valoresOriginales);

      if (!recomendacionesData || Object.keys(recomendacionesData).length === 0) {
      setNoHayRecomendaciones(true);
      return;
      }

      const ORI_objetivo = recomendacionesData?.ORI;
      const timestamp = recomendacionesData?.timestamp;


      if(ORI_objetivo !== undefined) {
        setOriObjetivo(ORI_objetivo);
      }
      if (timestamp !== undefined) {
        setTimestamp(timestamp);
      }
      delete recomendacionesData.ORI;
      delete recomendacionesData.timestamp;
      
      const lista = Object.entries(recomendacionesData).map(([key, value] : [string, any]) => {
        const valorUsuario = Number(habitosActuales?.[key]) || 0;
        return {
        id: key,
        nombre: habitLabels[key] || key,
        original: value.original,
        recomendado: value.objetivo,
        valor: valorUsuario, 
        };
      });

      setRecomendaciones(lista);
      setNoHayRecomendaciones(false);
    } catch (error) {
        console.log('Error al cargar recomendaciones, puede que todavia no existan recomendaciones', error);
        setNoHayRecomendaciones(true); 
    }
  };

  const confirmarActualizarHabitos = async () => {
    try {
      setActualizando(true);
      const datosHabitos: Record<string, string> = {};

      recomendaciones.forEach(rec => {
        datosHabitos[rec.id] = String(rec.valor);
      });

      await guardarHabitosEnFirestore(datosHabitos);
      const resultado = await evaluateOriApi();

      const cambiosAntes: Record<string, string> = {};
      const cambiosDespues: Record<string, string> = {};

      recomendaciones.forEach((rec) => {
        const nuevoValor = datosHabitos[rec.id];
        const valorOriginal = originalHabits[rec.id];
        if (nuevoValor !== valorOriginal) {
          cambiosAntes[rec.id] = valorOriginal;
          cambiosDespues[rec.id] = nuevoValor;
        }
      });

      await guardarORIHistorial({
        fecha: new Date(),
        ori: Number(resultado.ORI),
        cambios: {
          antes: cambiosAntes,
          despues: cambiosDespues,
        },
      });

      setOriginalHabits({ ...datosHabitos });
      cargarORI();
      alert(`Hábitos guardados y ORI recalculado correctamente`);
    } catch (error) {
      console.error('Error al actualizar hábitos:', error);
    }
    finally {
      setActualizando(false);
    }
  };

  const handleActualizarHabitos = () => {
    if (ejecutando) {
      setModalVisible(true);
    } else {
      confirmarActualizarHabitos();
    }
  };

  useFocusEffect(
    useCallback(() => {
      const cargarTodo = async () => {
      try {
        setLoading(true);
        await cargarORI();
        await cargarRecomendaciones();
        setLoading(false);
      } catch (error) {
          console.error('Error al cargar datos:', error); 
          setLoading(false);
      } 
    };

    cargarTodo();
  }, [])
);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Cargando ORI...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ScrollView contentContainerStyle ={styles.scrollContainer}>
        <ConfirmModal
          visible={modalVisible}
          tipo='modificarResultados'
          onCancelar={() => setModalVisible(false)}
          onConfirmar={() => {
            setModalVisible(false);
            confirmarActualizarHabitos();
          }}
        />
        <View style={styles.container}>
          <CFOGauge value={ori} />

          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setMostrarInfo(prev => !prev)}
          >
            <Text style={styles.infoIcon}>i</Text>
          </TouchableOpacity>

          {mostrarInfo && (
            <Text style={styles.infoText}>
              El ORI (Índice de Riesgo de Obesidad) es un valor calculado a partir de tus hábitos. Un valor alto indica mayor riesgo estimado asociado a tus hábitos actuales.
            </Text>
          )}
          {oriObjetivo !== null && (
            <View style={styles.oriObjetivoBox}>
              <Text style={styles.oriObjetivoTexto}>
                Valor alcanzable con estas recomendaciones: ORI {oriObjetivo}
              </Text>
            </View>
        )}
        {noHayRecomendaciones ? (
          <View style={styles.noRecomendacionesContainer}>
            <Text style={styles.noRecomendacionesTexto}>
              No hay recomendaciones disponibles. Ve a la sección de hábitos e introduce tus datos para obtener recomendaciones personalizadas.
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/habits')}
              style={styles.botonIntroducirDatos}
            >
              <Text style={styles.botonIntroducirDatosTexto}>Introducir datos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
          {recomendaciones.map((rec, i) => (
          <RecomendacionEditable
            key={i}
            nombre={rec.nombre}
            original={rec.original}
            recomendado={rec.recomendado}
            valor={rec.valor}
            onChange={(nuevoValor) => {
              const nuevas = [...recomendaciones];
              nuevas[i].valor = nuevoValor;
              setRecomendaciones(nuevas);
            }}
          />
          ))}
        <TouchableOpacity style={styles.botonGuardar} onPress={handleActualizarHabitos}>
          <Text style={styles.botonGuardarTexto}>Guardar y recalcular ORI</Text>
        </TouchableOpacity>
        </>
        )}
      </View>
      </ScrollView>
      {actualizando && <LoaderOverlay />}
    </View>

    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  scrollContainer: {
    paddingBottom: 40,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
//////////////////////
  infoButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#cce4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  infoIcon: {
    color: '#075eec',
    fontWeight: 'bold',
    fontSize: 18,
  },

  infoText: {
    marginTop: 10,
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  ///////////////// box verde ORI final

  oriObjetivoBox: {
    backgroundColor: '#d7f9d0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 20,
    alignSelf: 'stretch',
  },

  oriObjetivoTexto: {
    fontSize: 14,
    color: '#225c1f',
    fontWeight: '600',
    textAlign: 'center',
  },
  botonGuardar: {
    marginTop: 20,
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  botonGuardarTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  //////////////////////

  noRecomendacionesContainer: {
  marginTop: 30,
  paddingHorizontal: 20,
  alignItems: 'center',
  },

  noRecomendacionesTexto: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },

  botonIntroducirDatos: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  botonIntroducirDatosTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});