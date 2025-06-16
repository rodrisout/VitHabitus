import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Calendar, DateData} from 'react-native-calendars';
import useAuthRedirect from '../components/login/authRedirect';
import { obtenerUltimosORI } from '@/services/cargarHistorialOri';
import dayjs from 'dayjs';
import { leercampoBD } from '@/services/firebaseService';
import habitLabels from '../data/habitLabel';

export default function CalendarScreen() {
  useAuthRedirect();
  const [selected, setSelected] = useState('');
  const [eventosPorDia, setEventosPorDia] = useState<Record<string, any[]>>({});
  const [expandidos, setExpandidos] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

  const toggleExpand = (key: string) => {
    setExpandidos((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const cargarEventos = async () => {
    
    try {
      setLoading(true);

      const [oriHist, recomendaciones] = await Promise.all([
        obtenerUltimosORI(200), 
        leercampoBD('habitos/recomendacion') || {},
      ]);

      const eventos: Record<string, any[]> = {};
      const newMarkedDates: Record<string, any> = {};


      oriHist.forEach((ori: any, index: number) => {
        const fecha = dayjs(ori.fecha.toDate()).format('YYYY-MM-DD');
        if (!eventos[fecha]) eventos[fecha] = [];
        eventos[fecha].push({ tipo: 'ori', datos: ori, key: `ori-${index}` });
  
      newMarkedDates[fecha] = {
          ...(newMarkedDates[fecha] || {}),
          dots: [
            ...(newMarkedDates[fecha]?.dots || []).filter((d: any) => d.key !== 'ori'),
            { key: 'ori', color: 'orange' },
          ],
        };
      });

      if (recomendaciones.timestamp) {
        const fechaRecom = dayjs(recomendaciones.timestamp).format('YYYY-MM-DD');
        if (!eventos[fechaRecom]) eventos[fechaRecom] = [];
        eventos[fechaRecom].push({ tipo: 'recomendacion', datos: recomendaciones, key: 'recomendacion' });
        
        newMarkedDates[fechaRecom] = {
          ...(newMarkedDates[fechaRecom] || {}),
          dots: [
            ...(newMarkedDates[fechaRecom]?.dots || []).filter((d: any) => d.key !== 'recomendacion'),
            { key: 'recomendacion', color: 'green' },
          ],
        };
      }
      
      setEventosPorDia(eventos);
      setMarkedDates(newMarkedDates);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarEventos();
  };

  return (
    <ScrollView style={styles.eventosScroll}
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: DateData) => setSelected(day.dateString)}
        markedDates={{
          ...markedDates,
          [selected]: {
            ...(markedDates[selected] || {}),
            selected: true,
            selectedColor: '#075eec',
          },
        }}
        markingType="multi-dot"
        theme={{
          selectedDayTextColor: '#fff',
          todayTextColor: '#075eec',
          arrowColor: '#075eec',
        }}
      />
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: 'orange' }]} />
          <Text style={styles.legendText}>Modificación ORI</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: 'green' }]} />
          <Text style={styles.legendText}>Recomendación</Text>
        </View>
      </View>
      
      {selected !== '' && (
        <View style={styles.eventosContainer}>
          <Text style={styles.text}>Día seleccionado: {selected}</Text>

          {loading ? (
            <ActivityIndicator />
          ) : (
            eventosPorDia[selected]?.map((evento, i) => (
              <View key={evento.key || i} style={styles.eventContainer}>
                <Text style={styles.eventTipo}>{evento.tipo === 'ori' ? 'Modificación ORI' : 'Recomendaciones generadas'}</Text>

                <TouchableOpacity onPress={() => toggleExpand(evento.key || i.toString())}>
                  <Text style={styles.verCambios}>
                    {expandidos[evento.key || i.toString()] ? '▼ Ocultar detalles' : '▶ Ver detalles'}
                  </Text>
                </TouchableOpacity>

                {expandidos[evento.key || i.toString()] && evento.tipo === 'ori' && (
                  <View style={styles.cambiosContainer}>
                    {Object.keys(evento.datos.cambios.antes).map((key) => {
                      const nombre = habitLabels[key] || key;
                      return (
                        <View key={key} style={styles.cambioLineaContainer}>
                          <Text style={styles.cambioClave}>• {nombre}:</Text>
                          <Text style={styles.cambioValor}>
                            {evento.datos.cambios.antes[key]} → {evento.datos.cambios.despues[key]}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}

                {expandidos[evento.key || i.toString()] && evento.tipo === 'recomendacion' && (
                  <View style={styles.cambiosContainer}>
                    {Object.entries(evento.datos).map(([key, value]: [string, any]) => {
                      if (key === 'ORI' || key === 'timestamp') return null;
                      const nombre = habitLabels[key] || key;
                      return (
                        <View key={key} style={styles.cambioLineaContainer}>
                          <Text style={styles.cambioClave}>• {nombre}:</Text>
                          <Text style={styles.cambioValor}>
                            {value.original} → {value.objetivo}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f0f8ff',
  },
  eventosScroll: {
    maxHeight: 600,       
    backgroundColor: '#f0f8ff',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    color: '#333',
  },
  eventosContainer: {
    padding: 16,
  },
  eventContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  eventTipo: {
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 6,
  },
  verCambios: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 8,
  },
  cambiosContainer: {
    marginTop: 4,
    paddingLeft: 10,
  },
  cambioLineaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 8,
  },
  cambioClave: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    flexShrink: 1,
  },
  cambioValor: {
    fontSize: 13,
    color: '#333',
    fontWeight: '400',
    marginLeft: 8,
  },

  /////////////leyenda
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 13,
    color: '#333',
  },
});
