import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { buscarRelatos, criarTabela } from '../services/database';
import RelatoCard from '../../components/ui/RelatoCard';

export default function HomeScreen() {
  const [relatos, setRelatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    criarTabela();
    buscarRelatos((dados) => {
      setRelatos(dados);
      setLoading(false);
    });
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
      <Text style={styles.title}>Relatos da Comunidade</Text>
      <FlatList
        data={relatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RelatoCard
            titulo={item.titulo}
            categoria={item.categoria}
            endereco={item.endereco}
            data={item.data}
            imagem={JSON.parse(item.fotos)?.[0]}
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
