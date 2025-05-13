import React from 'react';
import { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import BotonAccion from './components/BotonAccion';
import HeaderHome from './components/HeaderHome';
import SectionsHome from './components/SectionsHome';
import useAuthRedirect from './components/login/authRedirect';

import { verifyWithApi } from '../services/verifyApi';

export default function HomeScreen() {
  useAuthRedirect();

  useEffect(() => {
    verifyWithApi();
  }, []);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container}>
        <HeaderHome />

        {/* Quick Actions Grid */}
        <View style={styles.quickActions}>
          <BotonAccion
            icon="bulb-outline"
            text="Mis Hábitos"
            color="#4CAF50"
            href="/(tabs)/habits"
          />
          <BotonAccion
            icon="list-outline"
            text="Resultados"
            color="#2196F3"
            href="/(tabs)/results"
          />
          <BotonAccion
            icon="document-text-outline"
            text="Notas"
            color="#FF9800"
            href="/(tabs)/notes"
          />
          <BotonAccion
            icon="calendar-outline"
            text="Calendario"
            color="#9C27B0"
            href="/(tabs)/calendar"
          />
        </View>

        <SectionsHome />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3e9a6F',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
}); 