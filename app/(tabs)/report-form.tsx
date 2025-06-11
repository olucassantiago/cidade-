import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { inserirRelato } from '../services/database';
import BotaoPrincipal from '../../components/ui/BotaoPrincipal';
import InputTexto from '../../components/ui/InputTexto';
import DropdownCategorias from '../../components/ui/DropdownCategorias';

const categorias = ['Buraco', 'Iluminação', 'Lixo', 'Outro'];

export default function ReportFormScreen() {
  const [categoria, setCategoria] = useState('');
  const [titulo, setTitulo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [fotos, setFotos] = useState<string[]>([]);
  const [local, setLocal] = useState({ latitude: -23.56, longitude: -46.64 });

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      setFotos(uris);
    }
  };

  const handleSubmit = async () => {
    if (!titulo || !categoria || !endereco) {
      Alert.alert('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      inserirRelato({
        titulo,
        categoria,
        endereco,
        data: new Date().toISOString(),
        latitude: local.latitude,
        longitude: local.longitude,
        fotos,
      });

      Alert.alert('Relato salvo localmente com sucesso!');
      setTitulo('');
      setCategoria('');
      setEndereco('');
      setFotos([]);
    } catch (err) {
      Alert.alert('Erro ao salvar o relato');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Novo Relato</Text>

      <DropdownCategorias categorias={categorias} selecionada={categoria} onSelect={setCategoria} />
      <InputTexto valor={titulo} aoMudar={setTitulo} placeholder="Título do relato" />
      <InputTexto valor={endereco} aoMudar={setEndereco} placeholder="Endereço" />

      <Text style={styles.label}>Selecione a localização</Text>
      <MapView
        style={styles.map}
        initialRegion={{ ...local, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
        onPress={(e) => setLocal(e.nativeEvent.coordinate)}
      >
        <Marker coordinate={local} />
      </MapView>

      <Text style={styles.label}>Fotos (até 5)</Text>
      <BotaoPrincipal texto="Escolher Imagens" onPress={pickImages} />

      <ScrollView horizontal style={{ marginTop: 8 }}>
        {fotos.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>

      <BotaoPrincipal texto="Enviar Relato" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  label: { marginTop: 12, fontWeight: '600' },
  map: { height: 200, marginVertical: 12 },
  image: { width: 100, height: 100, marginRight: 8, borderRadius: 8 },
});
