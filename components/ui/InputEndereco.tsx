import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function InputEndereco({ valor, aoMudar, onBuscarMapa }: {
  valor: string;
  aoMudar: (texto: string) => void;
  onBuscarMapa: () => void;
}) {
  return (
    <View>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={aoMudar}
        placeholder="Digite o endereço"
      />
      <TouchableOpacity onPress={onBuscarMapa} style={styles.botao}>
        <Text style={styles.texto}>Usar mapa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8 },
  botao: { backgroundColor: '#184d9d', marginTop: 6, padding: 10, borderRadius: 8 },
  texto: { color: '#fff', textAlign: 'center' },
});
