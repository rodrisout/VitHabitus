import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Stack, useFocusEffect } from 'expo-router';
import BotonAccion from './components/ui/BotonAccion';
import HeaderHome from './components/HeaderHome';
import SectionsHome from './components/SectionsHome';
import useAuthRedirect from './components/login/authRedirect';

import { verifyWithApi } from '../services/api/verifyApi';


export default function HomeScreen() {
  useAuthRedirect();

  const [refreshing, setRefreshing] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await verifyWithApi();
      setReloadKey(prev => prev + 1);

    } catch (error) {
      console.error('Error al refrescar:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    verifyWithApi();
  }, []);

   useFocusEffect(
    useCallback(() => {
      setReloadKey(prev => prev + 1); 
    }, [])
  );
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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

        <SectionsHome reloadKey={reloadKey}/>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 10, 
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
}); 