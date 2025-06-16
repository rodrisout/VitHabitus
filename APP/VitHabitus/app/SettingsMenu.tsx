import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { clearSession } from '../services/Session';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { router } from 'expo-router';
import { deleteUserAndData } from '@/services/DeleteAccount';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsMenu({ visible, onClose }: Props) {
  
  const handleLogout = async () => {
    await signOut(auth);
    console.log('Usuario deslogueado');
    await clearSession();
    onClose();
    router.replace('/login');
  };


  const handleDeleteAccount = () => {
  Alert.alert(
    '¿Eliminar cuenta?',
    'Esta acción borrará tu cuenta y todos tus datos. No se puede deshacer.',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'borrar',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteUserAndData();
            onClose();
            router.replace('/login');
          } catch (error) {
            console.error('Error al borrar cuenta:', error);
            Alert.alert(
              'Error',
              'No se pudo eliminar la cuenta. Es posible que necesites volver a iniciar sesión para confirmar.'
            );
          }
        }
      }
    ]
  );
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
        <TouchableOpacity onPress={() => { 
          router.push('/perfil'); 
          onClose(); 
          }}>
          <Text style={styles.item}>Perfil</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={() => {
          router.push('/components/login/TerminosCondiciones');
          onClose();
          }}>
          <Text style={styles.terms}>Términos y Condiciones</Text>
        </TouchableOpacity>
        <View style={styles.divider} />     

        <TouchableOpacity onPress={handleDeleteAccount}>
          <Text style={styles.delete}>Borrar cuenta</Text>
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
      alignItems: 'flex-end', 
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
      textAlign: 'center',
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

    delete: {
      fontSize: 16,
      paddingVertical: 10,
      color: 'darkred',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    terms: {
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
});
