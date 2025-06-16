import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { obtenerUltimosORI } from '@/services/cargarHistorialOri';
import dayjs from 'dayjs';
import habitLabels from '../data/habitLabel';

function SeccionHistorialORI({ reloadKey }: { reloadKey: number }) {
  const [historial, setHistorial] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [verMas, setVerMas] = useState(false);
  const [itemsExpandido, setItemsExpandido] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        setLoading(true);
        const datos = await obtenerUltimosORI(20);
        setHistorial(datos);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [reloadKey]);

  const historialMostrado = verMas ? historial : historial.slice(0, 2);

  const toggleExpandido = (id: string) => {
    setItemsExpandido((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Historial ORI</Text>
        {historial.length > 2 && (
          <TouchableOpacity onPress={() => setVerMas(!verMas)}>
            <Text style={styles.seeAllLink}>{verMas ? 'Ver menos' : 'Ver más'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : historialMostrado.length === 0 ? (
          <Text style={styles.emptyText}>Sin registros de ORI.</Text>
        ) : (
          historialMostrado.map((item) => (
            <View key={item.id} style={styles.historialItem}>
              <View style={styles.historialHeader}>
                <View>
                  <Text style={styles.historialOri}>ORI: {item.ori}</Text>
                  <Text style={styles.historialFecha}>
                    {dayjs(item.fecha.toDate()).format('DD/MM/YYYY HH:mm')}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => toggleExpandido(item.id)}>
                  <Text style={styles.verCambios}>
                    {itemsExpandido[item.id] ? '▼ Ocultar cambios' : '▶ Ver cambios'}
                  </Text>
                </TouchableOpacity>
              </View>

              {itemsExpandido[item.id] && (
                <View style={styles.cambiosContainer}>
                  <Text style={styles.cambiosTitulo}>Cambios:</Text>
                  {Object.keys(item.cambios.antes).map((key) => {
                    const nombre = habitLabels[key] || key;
                    return (
                    <View key={key} style={styles.cambioLineaContainer}>
                      <Text style={styles.cambioClave}>• {nombre}: </Text>
                      <View style={styles.cambioValorContainer}>
                        <Text style={styles.cambioValor}>
                          {item.cambios.antes[key]} → {item.cambios.despues[key]}
                        </Text>
                      </View>
                    </View>
                    );
                  })}
                </View>
              )}

              <View style={styles.divider} />
            </View>
          ))
        )}
      </View>
    </View>
  );
}

export default SeccionHistorialORI;

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllLink: {
    fontSize: 14,
    color: '#2196F3',
  },
  contentContainer: {
    minHeight: 100,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  historialItem: {
    marginBottom: 12,
  },
  historialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historialOri: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#075eec',
  },
  historialFecha: {
    fontSize: 13,
    color: '#555',
  },
  verCambios: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  cambiosContainer: {
    marginTop: 8,
    paddingLeft: 10,
  },
  cambiosTitulo: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#444',
  },
  cambioLinea: {
    fontSize: 13,
    color: '#333',
  },
  divider: {
    marginTop: 10,
    height: 1,
    backgroundColor: '#ddd',
  },
  ////////////////////////////

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
  },
  cambioValorContainer: {
    width: 80,
    alignItems: 'flex-end',
  },
});