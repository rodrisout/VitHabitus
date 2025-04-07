import React, { useState } from 'react';
import Header from './components/login/Header';
import FormInput from './components/login/FormInput';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { signIn } from '../services/authService';
import { useRouter } from 'expo-router';
import {saveSession} from '../services/Session'

//ui
import LoaderOverlay from '../app/components/ui/Loader';

export default function LoginScreen() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async() => {
    setLoading(true);
    try{
      const user = await signIn(form.email, form.password);
      console.log('Usuario logueado', user.email);
      saveSession(user.uid);
      router.replace('/home');

    }catch (error: any){
      Alert.alert('Error de inicio de sesion', error.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
          <Header title= "Bienvenido a" highlightText="VitHabitus"/>

            <View style={styles.form}>
              <FormInput
                label="Correo electrónico"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={(email) => setForm({ ...form, email })}
                placeholder="john@example.com"
                value={form.email}
              />

              <FormInput
                label="Contraseña"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="********"
                secureTextEntry
                value={form.password}
              />

              <View style={styles.formAction}>
                <TouchableOpacity onPress={handleLogin}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Iniciar Sesión</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity>
                <Text style={styles.formLink}>Olvidó su contraseña?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.footerButton} onPress={() => router.push('/register') }>
              <Text style={styles.formFooter}>
                Don't have an account?{' '}
                <Text style={{ textDecorationLine: 'underline' }}>Crear cuenta</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {loading && <LoaderOverlay />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 18, 
  },
  /** Form */
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
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  footerButton: {
    marginTop: 'auto', 
    paddingVertical: 16,
  },
  
  /** Button */
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