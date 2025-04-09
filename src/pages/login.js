import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from "react-native"

export default function Login({ navigation }) {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async () => {
        if (usuario.trim() === "" || senha.trim() === "") {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        try {
            const dadosSalvos = await AsyncStorage.getItem("usuario");
            const usuarioSalvo = JSON.parse(dadosSalvos);

            if (usuarioSalvo && usuario === usuarioSalvo.email && senha === usuarioSalvo.senha) {
                navigation.navigate("Home");
            } else {
                Alert.alert("Erro", "Usuário ou senha inválidos");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível verificar os dados");
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source={{uri: "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"}}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Entrar na Pokédex</Text>

            <TextInput 
                style={styles.input}
                placeholder="Usuário (e-mail)"
                placeholderTextColor="#555"
                onChangeText={setUsuario}
                value={usuario}
            />
            <TextInput 
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#555"
                secureTextEntry
                onChangeText={setSenha}
                value={senha}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                <Text style={styles.link}>Cadastrar novo treinador</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EF5350",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    logo: {
        width: 200,
        height: 80,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        color: "#FFFFFF",
        marginBottom: 20,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        color: "#212121",
    },
    button: {
        backgroundColor: "#FFEB3B",
        padding: 12,
        width: "100%",
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#212121",
    },
    link: {
        marginTop: 20,
        color: "#FFFFFF",
        textDecorationLine: "underline",
        fontSize: 14,
    },
});