import React, { useEffect, useState } from "react";
import {View, TextInput, StyleSheet, Text, ActivityIndicator, Alert, TouchableOpacity} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import {getFirestore, doc, getDoc, serverTimestamp, addDoc, collection, updateDoc} from "firebase/firestore";
import { deleteNota } from "../services/notasFirebase";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

const db = getFirestore();
const auth = getAuth();

export default function NotaEditScreen() {
  const { id } = useLocalSearchParams();
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const iniciar = async () => {
      const user = auth.currentUser;
      if (!user) return;

      if (!id) {
        const nuevaNota = {
          titulo: "",
          contenido: "",
          fechaCreacion: serverTimestamp(),
          fechaActualizacion: serverTimestamp(),
        };
        const docRef = await addDoc(
          collection(db, "usuarios", user.uid, "notas"),
          nuevaNota
        );
        router.replace(`/notaEdit?id=${docRef.id}`);
        return;
      }

      const notaRef = doc(db, "usuarios", user.uid, "notas", id.toString());
      const notaSnap = await getDoc(notaRef);

      if (!notaSnap.exists()) {
        Alert.alert("Nota no encontrada");
        router.back();
        return;
      }

      const data = notaSnap.data();
      setTitulo(data.titulo || "");
      setContenido(data.contenido || "");
      setLoading(false);
    };

    iniciar();
  }, []);

  useEffect(() => {
    if (!id) return;

    setGuardando(true);
    const timeout = setTimeout(() => {
      const user = auth.currentUser;
      if (!user) return;
      const notaRef = doc(db, "usuarios", user.uid, "notas", id.toString());
      updateDoc(notaRef, {
        titulo,
        contenido,
        fechaActualizacion: serverTimestamp(),
      }).finally(() => {
      setGuardando(false);
    });
    }, 400);

    return () => clearTimeout(timeout);
  }, [titulo, contenido]);

  const handleBorrarNota = async () => {
    Alert.alert("¿Borrar nota?", "Esta acción no se puede deshacer.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Borrar",
        style: "destructive",
        onPress: async () => {
          await deleteNota(id!.toString());
          router.replace("/notes");
        },
      },
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.volver}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.label}>Título (máx 110 caracteres):</Text>
      <TextInput
        value={titulo}
        onChangeText={(text) => setTitulo(text.slice(0, 110))}
        placeholder="Título de la nota"
        style={styles.titulo}
      />

      <Text style={styles.label}>Contenido:</Text>
      <TextInput
        value={contenido}
        onChangeText={setContenido}
        placeholder="Escribe aquí tu nota..."
        multiline
        style={styles.contenido}
      />

      {id && (
        <TouchableOpacity style={styles.botonBorrar} onPress={handleBorrarNota}>
          <Text style={styles.textoBorrar}>Borrar nota</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  volver: { marginBottom: 10 },
  label: { fontSize: 14, marginBottom: 4, marginTop: 10 },
  titulo: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    marginBottom: 12,
  },
  contenido: {
    flex: 1,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  botonBorrar: {
    backgroundColor: "#df4040",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  textoBorrar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});