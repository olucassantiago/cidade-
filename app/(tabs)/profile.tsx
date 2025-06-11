
import { useRouter } from 'expo-router';
import { ScrollView, Alert, StyleSheet, Text } from 'react-native';
import AvatarUsuario from '../../components/ui/AvatarUsuario';
import InputTexto from '../../components/ui/InputTexto';
import BotaoPrincipal from '../../components/ui/BotaoPrincipal';
import BotaoSecundario from '../../components/ui/BotaoSecundario';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Você saiu do app.');
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <AvatarUsuario nome="Usuário Teste" />
      <InputTexto valor="João" aoMudar={() => {}} placeholder="Nome" />
      <InputTexto valor="Silva" aoMudar={() => {}} placeholder="Sobrenome" />
      <InputTexto valor="joaosilva" aoMudar={() => {}} placeholder="Usuário" />
      <InputTexto valor="15/06/1990" aoMudar={() => {}} placeholder="Data de nascimento" />
      <InputTexto valor="teste@exemplo.com" aoMudar={() => {}} placeholder="Email" />
      <InputTexto valor="(11) 99999-9999" aoMudar={() => {}} placeholder="Celular" />
      <BotaoSecundario texto="Redefinir senha" onPress={() => Alert.alert('Funcionalidade futura')} />
      <BotaoPrincipal texto="Sair" onPress={handleLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
});
