import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { clearSession } from '../../../services/Session';
import { signOut } from 'firebase/auth';
import { auth } from '../../../services/firebaseConfig';
import { router } from 'expo-router';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsMenu({ visible, onClose }: Props) {
  const handleLogout = async () => {
    await signOut(auth);
    await clearSession();
    onClose();
    router.replace('/login');
  };

  return (
    <Modal 
      isVisible={visible}
      onBackdropPress={onClose}
      backdropOpacity={0.3}
      style={styles.modal}
      animationIn="slideInRight"    
      animationOut="slideOutRight" 
      >
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => { console.log('Ir a perfil'); onClose(); }}>
          <Text style={styles.item}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { console.log('Ir a preferencias'); onClose(); }}>
          <Text style={styles.item}>Preferencias</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modal: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end', // 👈 esto posiciona el menú a la derecha
      margin: 0,
    },
    menu: {
      width: 250,
      height: '100%',
      backgroundColor: '#fff',
      padding: 20,
      justifyContent: 'flex-start',
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 10,
    },
    item: {
      fontSize: 16,
      paddingVertical: 10,
      color: '#333',
    },
    divider: {
      height: 1,
      backgroundColor: '#ddd',
      marginVertical: 8,
    },
    logout: {
      fontSize: 16,
      paddingVertical: 10,
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
    },
});
