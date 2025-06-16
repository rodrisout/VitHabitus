import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface Props {
  nombre: string;
  original: number;
  recomendado: number;
  valor: number;
  onChange: (nuevo: number) => void;
}

export default function RecomendacionEditable({
  nombre,
  original,
  recomendado,
  valor,
  onChange,
}: Props) {
  const [holding, setHolding] = useState<null | 'inc' | 'dec'>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const incrementar = () => onChange(valor + 1);
  const decrementar = () => onChange(Math.max(0, valor - 1));

  useEffect(() => {
    if (holding) {
      const action = holding === 'inc' ? incrementar : decrementar;

      // Ejecutar primero
      action();

      // Empezar a repetir después de 300 ms
      const timeout = setTimeout(() => {
        intervalRef.current = setInterval(action, 100);
      }, 300);

      return () => {
        clearTimeout(timeout);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [holding]);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.nombre}>{nombre}</Text>

      <View style={styles.infoContenedor}>
        <Text style={styles.texto}>
          Original: {original} → Recomendado: {recomendado}
        </Text>
      </View>

      <View style={styles.stepper}>
        <Pressable
          onPressIn={() => setHolding('dec')}
          onPressOut={() => setHolding(null)}
          style={styles.boton}
        >
          <Text style={styles.botonTexto}>-</Text>
        </Pressable>

        <Text style={styles.valor}>{valor}</Text>

        <Pressable
          onPressIn={() => setHolding('inc')}
          onPressOut={() => setHolding(null)}
          style={styles.boton}
        >
          <Text style={styles.botonTexto}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  infoContenedor: {
    backgroundColor: '#eef4ff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  texto: {
    fontSize: 14,
    color: '#555',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#cce4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#075eec',
  },
  valor: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
  },
});