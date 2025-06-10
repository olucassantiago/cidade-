
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
//import { db } from '../../services/firebase';
import RelatoCard from '../../components/ui/RelatoCard';

export default function HomeScreen() {
  const [relatos, setRelatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'relatos'), orderBy('data', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data()),
      }));
      setRelatos(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#771e21" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatos</Text>
      <FlatList
        data={relatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RelatoCard
            titulo={item.titulo}
            categoria={item.categoria}
            endereco={item.endereco}
            data={item.data}
            imagem={item.fotos?.[0]}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: '#184d9d' },
});
