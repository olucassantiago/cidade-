import { View, Text, StyleSheet } from 'react-native';

export default function HeaderApp({ titulo }: { titulo: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 16, backgroundColor: '#771e21' },
  titulo: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
