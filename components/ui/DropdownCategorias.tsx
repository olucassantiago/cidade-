import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DropdownCategorias({ categorias, selecionada, onSelect }: {
  categorias: string[];
  selecionada: string;
  onSelect: (categoria: string) => void;
}) {
  return (
    <View style={styles.container}>
      {categorias.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.botao, selecionada === cat && styles.ativo]}
          onPress={() => onSelect(cat)}
        >
          <Text style={[styles.texto, selecionada === cat && styles.textoAtivo]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  botao: { backgroundColor: '#eee', padding: 10, borderRadius: 20 },
  ativo: { backgroundColor: '#771e21' },
  texto: { color: '#444' },
  textoAtivo: { color: '#fff' },
});
