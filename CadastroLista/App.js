import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [users, setUsers] = useState([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const saveUser = async () => {
    try {
      if (!code || !name || !email || !password) {
        Alert.alert('Erro', 'Preencha todos os campos');
        return;
      }

      const newUser = {
        code,
        name,
        email,
        password,
      };

      await AsyncStorage.setItem(code, JSON.stringify(newUser));

      setCode('');
      setName('');
      setEmail('');
      setPassword('');
      getUserList();
    } catch (error) {
      console.error('Erro salvando usuário:', error);
      Alert.alert('Erro', 'Erro salvando usuário');
    }
  };

  const renderUserList = () => {
    return users.map((user) => (
      <Button
        key={user.code}
        title={`Carregar Usuário: ${user.name}`}
        onPress={() => loadUser(user)}
      />
    ));
  };

  const loadUser = (user) => {
    setSelectedUser(user);
    setCode(user.code);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
  };

  const getUserList = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const usersData = await AsyncStorage.multiGet(allKeys);
      const usersList = usersData.map(([, userData]) => JSON.parse(userData));
  
      setUsers(usersList);
    } catch (error) {
      console.error('Erro ao recuperar a lista de usuários:', error);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.legenda}>Cadastro de Usuário</Text>
        <TextInput
          placeholder="Código"
          value={code}
          onChangeText={setCode}
          style={styles.caixaTexto}
        />
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          style={styles.caixaTexto}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.caixaTexto}
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.caixaTexto}
        />
        <Button title="Salvar" onPress={saveUser} />
  
        <Text style={styles.legenda}>Lista de Usuários</Text>
        {renderUserList()}
  
        {selectedUser && (
          <View>
            <Text style={styles.legenda}>Usuário Selecionado</Text>
            <Text>Código: {selectedUser.code}</Text>
            <Text>Nome: {selectedUser.name}</Text>
            <Text>Email: {selectedUser.email}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixaTexto: {
    fontSize: 25,
    color: 'blue',
    width: 300,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    height: 40,
  },
  legenda: {
    fontSize: 20,
    color: 'black',
    marginBottom: 15,
  },
  userItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    margin: 16,
  },
});