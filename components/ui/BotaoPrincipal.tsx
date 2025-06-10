import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function BotaoPrincipal({ texto, onPress }: { texto: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#771e21', padding: 14, borderRadius: 8, marginTop: 12 },
  texto: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
