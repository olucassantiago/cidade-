import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function FiltroCategorias({ categorias, atual, aoSelecionar }: {
  categorias: string[];
  atual: string;
  aoSelecionar: (categoria: string) => void;
}) {
  return (
    <ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={false}>
      {categorias.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.botao, atual === cat && styles.botaoAtivo]}
          onPress={() => aoSelecionar(cat)}
        >
          <Text style={[styles.texto, atual === cat && styles.textoAtivo]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 8 },
  botao: { backgroundColor: '#ccc', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, marginRight: 8 },
  botaoAtivo: { backgroundColor: '#771e21' },
  texto: { color: '#444' },
  textoAtivo: { color: '#fff' },
});
