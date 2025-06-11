import { View, Text, StyleSheet } from 'react-native';

export default function AvatarUsuario({ nome }: { nome: string }) {
  const iniciais = nome.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <View style={styles.avatar}>
      <Text style={styles.iniciais}>{iniciais}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#184d9d',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iniciais: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
