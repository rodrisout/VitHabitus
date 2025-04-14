import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

//components
import Header from './components/login/Header';
import FormInput from './components/login/FormInput';
import PickerComponent from './components/PickerComponent';
import countries from './data/countries.json';


//autenticacion
import { sendEmailVerification } from 'firebase/auth';
import { signUp} from '../services/authService';
import { db } from '../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import EmailVerification from '../app/components/EmailVerfification';

//ui
import LoaderOverlay from '../app/components/ui/Loader';

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
  
  const handleRegister = async () => {
    setLoading(true);
    const { email, password, nombre, apellido, pais } = form;
    if (!email || !password || !nombre || !apellido || !pais) {
      Alert.alert('Campos obligatorios', 'Por favor, complete todos los campos.');
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
      
      setShowModal(true); // ✅ Mostrar modal de verificación

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
});
