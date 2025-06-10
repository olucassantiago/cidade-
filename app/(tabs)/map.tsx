import * as Location from 'expo-location';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
//import { db } from '../../services/firebase';

type Relato = {
  id: string;
  titulo: string;
  categoria: string;
  endereco: string;
  local: { latitude: number; longitude: number };
  fotos?: string[];
};

const categoriasDisponiveis = ['Todos', 'Buraco', 'Iluminação', 'Lixo', 'Outro'];

export default function MapaRelatos() {
  const [relatos, setRelatos] = useState<Relato[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [localUsuario, setLocalUsuario] = useState<{ latitude: number; longitude: number } | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'relatos'), (snapshot) => {
      const dados: Relato[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Relato, 'id'>),
      }));
      setRelatos(dados);
      setCarregando(false);
    });

    return () => unsub();
  }, []);

  const obterLocalizacao = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de localização negada.');
      return;
    }

    const local = await Location.getCurrentPositionAsync({});
    setLocalUsuario({
      latitude: local.coords.latitude,
      longitude: local.coords.longitude,
    });
  };

  const relatosFiltrados = categoriaSelecionada === 'Todos'
    ? relatos
    : relatos.filter((r) => r.categoria === categoriaSelecionada);

  if (carregando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#771e21" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal style={styles.filtros} showsHorizontalScrollIndicator={false}>
        {categoriasDisponiveis.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.botaoFiltro, categoriaSelecionada === cat && styles.botaoAtivo]}
            onPress={() => setCategoriaSelecionada(cat)}
          >
            <Text style={[styles.textoFiltro, categoriaSelecionada === cat && styles.textoAtivo]}>{cat}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={obterLocalizacao} style={styles.botaoLocalizacao}>
          <Text style={styles.textoLocal}>📍 Minha localização</Text>
        </TouchableOpacity>
      </ScrollView>

      <MapView
        style={styles.mapa}
        region={{
          latitude: localUsuario?.latitude ?? -23.56,
          longitude: localUsuario?.longitude ?? -46.64,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        {relatosFiltrados.map((relato) => (
          <Marker key={relato.id} coordinate={relato.local} pinColor="#771e21">
            <Callout>
              <View style={{ maxWidth: 250 }}>
                {relato.fotos && relato.fotos[0] && (
                  <Image source={{ uri: relato.fotos[0] }} style={styles.imagem} />
                )}
                <Text style={styles.titulo}>{relato.titulo}</Text>
                <Text>{relato.categoria}</Text>
                <Text>{relato.endereco}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapa: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontWeight: 'bold', marginTop: 6, marginBottom: 4 },
  imagem: { width: 220, height: 120, borderRadius: 6, marginBottom: 6 },
  filtros: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  botaoFiltro: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  botaoAtivo: {
    backgroundColor: '#771e21',
  },
  textoFiltro: {
    color: '#444',
    fontWeight: '600',
  },
  textoAtivo: {
    color: '#fff',
  },
  botaoLocalizacao: {
    backgroundColor: '#184d9d',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  textoLocal: {
    color: '#fff',
    fontWeight: '600',
  },
});
