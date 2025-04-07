import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


interface HeaderProps {
    subtitle?: string;
  }


export const Header = ({ subtitle }: HeaderProps) => (
    <View style={styles.header}>
      <Image
        alt="App Logo"
        resizeMode="contain"
        style={styles.headerImg}
        source={require('../../../assets/images/logo_inside1x.png')}
      />
      <Text style={styles.title}>
        Sign in to <Text style={{ color: '#075eec' }}>VitHabitus</Text>
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );


  const styles = StyleSheet.create({
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 36,
    },
    headerImg: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginBottom: 36,
    },
    title: {
      fontSize: 31,
      fontWeight: '700',
      color: '#1D2A32',
      marginBottom: 6,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: '#929292',
      textAlign: 'center',
    },
  });

  export default Header;