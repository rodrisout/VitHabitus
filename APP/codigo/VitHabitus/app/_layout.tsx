import { Stack } from 'expo-router';
import { RecomendadorProvider, useRecomendador } from './components/global/RecomendadorContext';
import { View, Text, StyleSheet } from 'react-native';

function GlobalBanner() {
  const { ejecutando } = useRecomendador();

  if (!ejecutando) return null;

  return (
    <View style={styles.global_message}>
      <Text style={styles.text_global_message}>
        🧠 Ejecutando recomendador...
      </Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <RecomendadorProvider>
      <GlobalBanner />
      <Stack screenOptions={{ headerShown: false }} />
    </RecomendadorProvider>
  );
}


const styles = StyleSheet.create({
  global_message: {
    backgroundColor: '#ffcc00',
    padding: 10, 
  },
  text_global_message: {
    color: '#333', 
    fontWeight: 'bold', 
    textAlign: 'center',
  },
});