import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BotaoSecundario({ texto, onPress }: { texto: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: { backgroundColor: '#ccc', padding: 14, borderRadius: 8 },
  texto: { color: '#000', textAlign: 'center' },
});
