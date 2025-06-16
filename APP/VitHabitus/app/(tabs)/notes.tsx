import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { getNotas, deleteNota } from "../../services/notasFirebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { router } from "expo-router";
import { Link } from "expo-router";
import PullToRefreshList from "../components/ui/PullToRefreshList";
import { Ionicons } from "@expo/vector-icons";

interface Nota {
  id: string;
  titulo: string;
  contenido: string;
  fechaCreacion: any;
  color?: string;
}

export default function NotesScreen() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const cargarNotas = async () => {
    setLoading(true);
    const data = await getNotas();
    if (data) setNotas(data as Nota[]);
    setLoading(false);
  };

  useEffect(() => {
    cargarNotas();
  }, []);

  const handleDeleteNota = async (id: string) => {
    await deleteNota(id);
    await cargarNotas();
  };

  const renderItem = ({ item }: { item: Nota }) => {
    const fecha = item.fechaCreacion?.toDate?.().toLocaleDateString?.() || "";
    const bgColor = item.color || "#f9f9f9";

    return (
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Link href={`/notaEdit?id=${item.id}`} asChild>
          <TouchableOpacity style={{ flex: 1 }}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.contenido}>
              {item.contenido?.substring(0, 50)}
            </Text>
            <Text style={styles.fecha}>{fecha}</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          onPress={() => handleDeleteNota(item.id)}
          style={styles.borrar}
        >
          <View style={styles.borrarIconoBox}>
            <Ionicons name="trash-outline" size={20} color="#cc0000" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const notasFiltradas = notas.filter((nota) =>
    nota.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar notas..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.botonCrear}
          onPress={async () => {
            const user = getAuth().currentUser;
            if (!user) return;

            const nuevaNota = {
              titulo: "",
              contenido: "",
              fechaCreacion: serverTimestamp(),
              fechaActualizacion: serverTimestamp(),
            };

            const docRef = await addDoc(
              collection(getFirestore(), "usuarios", user.uid, "notas"),
              nuevaNota
            );
            router.push(`/notaEdit?id=${docRef.id}`);
          }}
        >
          <Text style={styles.mas}>+</Text>
        </TouchableOpacity>
      </View>

      <PullToRefreshList
        data={notasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onRefresh={cargarNotas}
        refreshing={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#f0f8ff" },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1, 
    borderColor: "#0075da",
  },
  botonCrear: {
    backgroundColor: "#007bff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  mas: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1, 
    borderColor: "#0075da",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contenido: {
    fontSize: 14,
    color: "#555",
  },
  fecha: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
  },
  borrar: {
    paddingHorizontal: 8,
    alignItems: "center",
  },
  borrarIconoBox: {
    backgroundColor: "#ffe6e6",
    borderRadius: 8,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});