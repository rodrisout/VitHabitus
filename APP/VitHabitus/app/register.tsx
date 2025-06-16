import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

//components
import Header from './components/login/Header';
import FormInput from './components/login/FormInput';
import PickerComponent from './components/ui/PickerComponent';
import countries from './data/countries.json';

//autenticacion
import { sendEmailVerification } from 'firebase/auth';
import { signUp} from '../services/authService';
import { db } from '../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import EmailVerification from '../app/components/login/EmailVerfification';

//ui
import LoaderOverlay from '../app/components/ui/Loader';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido:'',
    pais:'',
  });
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const handleRegister = async () => {
    setLoading(true);
    const { email, password, nombre, apellido, pais } = form;
    if (!email || !password || !nombre || !apellido || !pais) {
      Alert.alert('Campos obligatorios', 'Por favor, complete todos los campos.');
      setLoading(false);
      return;
    }
    if (!acceptedTerms) {
      Alert.alert('Términos y Condiciones', 'Debes aceptar los términos y condiciones para registrarte.');
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Correo no válido', 'Introduce un correo electrónico válido.');
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      Alert.alert(
      'Contraseña no segura',
      'La contraseña debe tener al menos 8 caracteres: una letra mayúscula, una letra minúscula y un número.'
      );
      setLoading(false);
    return;
    }
    
    try {
      const user = await signUp(form.email, form.password);
      console.log('Usuario registrado:', user.email);

      await sendEmailVerification(user);
    
      await setDoc(doc(db, 'usuarios', user.uid), {
        email: form.email,
        nombre: form.nombre,
        apellido: form.apellido,
        pais: form.pais,
        createdAt: new Date(),
      });
      
      setShowModal(true);

    } catch (error: any) {
      Alert.alert('Error al registrar', error.message);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
          <Header title= "Crear Cuenta" subtitle="Rellene los datos correspondientes" highlightText="VitHabitus"/>
            
            <View style={styles.form}>

              <FormInput
                label="Nombre*"
                onChangeText={(nombre) => setForm({ ...form, nombre })}
                placeholder="Juan"
                value={form.nombre}
              />

              <FormInput
                label="Apellidos*"
                onChangeText={(apellido) => setForm({ ...form, apellido })}
                placeholder="Pérez Gonzalez..."
                value={form.apellido}
              />
              <PickerComponent
                label="País"
                selectedValue={form.pais}
                onValueChange={(pais) => setForm({ ...form, pais })} 
                data={countries.map((c) => ({ label: c, value: c }))}  
              />
              <FormInput
                label="Correo electrónico*"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={(email) => setForm({ ...form, email })}
                placeholder="john@example.com"
                value={form.email}
              />

              <FormInput
                label="Contraseña*"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="********"
                secureTextEntry
                value={form.password}
              />
              <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={() => setAcceptedTerms(!acceptedTerms)} style={styles.checkbox}>
                  <View style={[styles.checkboxBox, acceptedTerms && styles.checkboxChecked]}>
                    {acceptedTerms && <Ionicons name="checkmark" size={16} color="white" />}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    Acepto los
                    <Text style={styles.linkText} onPress={() => router.push('/components/login/TerminosCondiciones')}>
                      {' Términos y Condiciones'}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.formAction}>
                <TouchableOpacity onPress={handleRegister}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Crear Cuenta</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.formLink}>¿Ya tienes una cuenta? Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    {loading && <LoaderOverlay />}

    <EmailVerification
      visible={showModal}
      email={form.email}
      onVerified={() => {
        setShowModal(false);
        router.replace('/home');
        } 
      }
    />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 18,
  },
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },

  ////////////////////////////////TERMINOS Y CONDICIONES//////////////////////////////////////
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 22,
    height: 22,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#075eec',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: '#075eec',
  },
  checkboxLabel: {
    fontSize: 14,
    flexShrink: 1,
  },
  linkText: {
    color: '#075eec',
    fontWeight: '600',
  },
  checkboxTick: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#075eec',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 2,
  },
});
