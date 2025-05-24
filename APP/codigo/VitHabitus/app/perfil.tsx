import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {EmailAuthProvider, reauthenticateWithCredential, updatePassword} from 'firebase/auth';
import { auth, db } from '../services/firebaseConfig';
import countries from './data/countries.json';
import LoaderOverlay from './components/ui/Loader';

export default function PerfilScreen() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [pais, setPais] = useState('');
  const [email, setEmail] = useState('');

  const [sexo, setSexo] = useState('');
  const [edad, setEdad] = useState('');

  const [passActual, setPassActual] = useState('');
  const [passNueva, setPassNueva] = useState('');
  const [passConfirmar, setPassConfirmar] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('No autenticado');

        setEmail(user.email || '');

        const refUser = doc(db, 'usuarios', user.uid);
        const snapUser = await getDoc(refUser);
        if (snapUser.exists()) {
          const data = snapUser.data();
          setNombre(data.nombre || '');
          setApellido(data.apellido || '');
          setPais(data.pais || '');
        }

        const refHabitos = doc(db, 'usuarios', user.uid, 'habitos', 'formulario');
        const snapHabitos = await getDoc(refHabitos);
        if (snapHabitos.exists()) {
          const data = snapHabitos.data();
          setSexo(data.sexo || '');
          setEdad(data.edad ? String(data.edad) : '');
        }
      } catch (err: any) {
        Alert.alert('Error al cargar perfil', err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const handleGuardarCambios = async () => {
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error('No autenticado');

      if (passNueva) {
        if (!passActual) {
          Alert.alert('Requiere contraseña', 'Introduce tu contraseña actual para cambiar la contraseña.');
          return;
        }

        if (passNueva !== passConfirmar) {
          Alert.alert('Error', 'Las contraseñas no coinciden');
          return;
        }

        if (passNueva.length < 8) {
          Alert.alert('Error', 'La nueva contraseña debe tener al menos 8 caracteres');
          return;
        }

        const cred = EmailAuthProvider.credential(user.email, passActual);
        await reauthenticateWithCredential(user, cred);
        await updatePassword(user, passNueva);
      }

      await setDoc(doc(db, 'usuarios', user.uid), {
        nombre, apellido, pais,
      }, { merge: true });

      await setDoc(doc(db, 'usuarios', user.uid, 'habitos', 'formulario'), {
        sexo, edad: edad ? String(edad) : null,
      }, { merge: true });

      Alert.alert('Guardado', 'Tus datos han sido actualizados');
      setPassActual('');
      setPassNueva('');
      setPassConfirmar('');
    } catch (e: any) {
      Alert.alert('Error', e.message || 'No se pudo guardar');
    }
    finally
    {
      setSaving(false);
    }
  };

  if (loading) return <LoaderOverlay />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Perfil de Usuario</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

        <Text style={styles.label}>Apellidos</Text>
        <TextInput style={styles.input} value={apellido} onChangeText={setApellido} />

        <Text style={styles.label}>País</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={pais} onValueChange={setPais}>
            <Picker.Item label="Seleccionar país" value="" />
            {countries.map((c, i) => <Picker.Item key={i} label={c} value={c} />)}
          </Picker>
        </View>

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#ddd' }]}
          editable={false}
          value={email}
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={edad} onChangeText={setEdad} />

        <Text style={styles.label}>Sexo</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={sexo} onValueChange={setSexo}>
            <Picker.Item label="Seleccionar sexo" value="" />
            <Picker.Item label="Hombre" value="1" />
            <Picker.Item label="Mujer" value="2" />
          </Picker>
        </View>

        <Text style={styles.label}>Contraseña actual</Text>
        <TextInput style={styles.input} secureTextEntry value={passActual} onChangeText={setPassActual} />

        <Text style={styles.label}>Nueva contraseña</Text>
        <TextInput style={styles.input} secureTextEntry value={passNueva} onChangeText={setPassNueva} />

        <Text style={styles.label}>Confirmar nueva contraseña</Text>
        <TextInput style={styles.input} secureTextEntry value={passConfirmar} onChangeText={setPassConfirmar} />

        <TouchableOpacity style={styles.btn} onPress={handleGuardarCambios}>
          <Text style={styles.btnText}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
      {saving && <LoaderOverlay />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  btn: {
    marginTop: 30,
    backgroundColor: '#075eec',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});