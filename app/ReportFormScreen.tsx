import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function ReportFormScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    // Aqui entraria a integração com Firestore no futuro
    Alert.alert('Relato enviado', 'Seu relato foi registrado com sucesso!');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Relato</Text>

      <TextInput
        placeholder="Título do problema"
        style={styles.input}
        onChangeText={setTitle}
        value={title}
      />

      <TextInput
        placeholder="Descrição detalhada"
        style={[styles.input, { height: 100 }]}
        multiline
        numberOfLines={4}
        onChangeText={setDescription}
        value={description}
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5, backgroundColor: '#fff' },
});
