import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native'

export default function Cadastro({ navigation }) {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [curso, setCurso] = useState("");
    const [senha, setSenha] = useState("");

    const handleSalvar = async () => {
        if (!nome || !telefone || !cpf || !email || !curso || !senha) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        const dados = { nome, telefone, cpf, email, curso, senha };

        try {
            await AsyncStorage.setItem("usuario", JSON.stringify(dados));
            Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
            navigation.navigate("Login");
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível salvar os dados");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
            <Text style={styles.title}>Cadastro de Treinador</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#555"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                placeholderTextColor="#555"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
            />
            <TextInput
                style={styles.input}
                placeholder="CPF"
                placeholderTextColor="#555"
                keyboardType="numeric"
                value={cpf}
                onChangeText={setCpf}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#555"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Curso"
                placeholderTextColor="#555"
                value={curso}
                onChangeText={setCurso}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#555"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleSalvar}>
                <Text style={styles.buttonText}>SALVAR</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EF5350',
    },
    scrollContent: {
      alignItems: 'center',
      padding: 20,
      paddingTop: 50,
      paddingBottom: 60,
    },
    title: {
      fontSize: 24,
      color: '#FFFFFF',
      marginBottom: 20,
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      padding: 12,
      borderRadius: 10,
      marginBottom: 15,
      fontSize: 16,
      color: '#212121',
    },
    button: {
      backgroundColor: '#FFEB3B',
      padding: 12,
      width: '100%',
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 40,
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#212121',
    },
  });