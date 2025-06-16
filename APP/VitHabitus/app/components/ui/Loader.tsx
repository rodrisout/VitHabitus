import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoaderOverlay() {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#075eec" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
