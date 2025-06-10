import { TextInput, StyleSheet } from 'react-native';

export default function InputTexto({ valor, aoMudar, placeholder, multiline = false }: {
  valor: string;
  aoMudar: (texto: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <TextInput
      style={[styles.input, multiline && styles.multiline]}
      value={valor}
      onChangeText={aoMudar}
      placeholder={placeholder}
      multiline={multiline}
    />
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12 },
  multiline: { height: 100, textAlignVertical: 'top' },
});
