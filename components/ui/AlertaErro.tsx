import { View, Text, StyleSheet } from 'react-native';

export default function AlertaErro({ mensagem }: { mensagem: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#ffdddd', padding: 12, borderRadius: 6, marginBottom: 10 },
  texto: { color: '#a00', textAlign: 'center' },
});
