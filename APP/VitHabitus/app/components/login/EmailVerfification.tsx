import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../services/firebaseConfig';
import { checkEmailVerified } from '../../../services/checkEmail';

interface Props {
  visible: boolean;
  email: string;
  onVerified: () => void;
  onClose?: () => void;
}

export default function EmailVerification({
  visible,
  email,
  onVerified,
  onClose
}: Props) {
  const [message, setMessage] = useState('');

  const handleResend = async () => {
    await sendEmailVerification(auth.currentUser!);
    setMessage('Correo reenviado correctamente ✔');
  };

  const handleCheck = async () => {
    const verificado = await checkEmailVerified();
    if (verificado) {
      setMessage('');
      onVerified();
    } else {
      setMessage('❌ El correo aún no ha sido verificado.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Verificación enviada</Text>
          <Text style={styles.message}>
            Te hemos enviado un correo a{" "}
            <Text style={styles.bold}>{email}</Text>. Verifica tu cuenta antes de continuar.
          </Text>

          {message !== '' && <Text style={styles.feedback}>{message}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleResend}>
            <Text style={styles.buttonText}>Reenviar correo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={handleCheck}>
            <Text style={styles.buttonText}>Ya verifiqué</Text>
          </TouchableOpacity>

          {onClose && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  bold: {
    fontWeight: '600',
    color: '#075eec'
  },
  feedback: {
    marginVertical: 10,
    color: '#075eec',
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#075eec',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: '600'
  },
  closeButton: {
    marginTop: 10
  },
  closeText: {
    color: '#999'
  }
});
