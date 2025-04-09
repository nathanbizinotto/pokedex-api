import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"
import { TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Home from "./pages/home";
import Detalhes from "./pages/detalhes";

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={({ navigation, route }) => ({
                    headerStyle: {
                        backgroundColor: '#EF5350', // vermelho pokédex
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    animation: 'fade',
                    headerLeft: () =>
                        route.name !== 'Login' ? ( // só mostra se não for a tela inicial
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                                <Ionicons name="arrow-back-circle" size={28} color="#FFFFFF" />
                            </TouchableOpacity>
                        ) : null,
                    headerTitle: () => (
                        <Image
                            source={require('../assets/pokeball.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    ),
                })}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: 'Entrar' }}
                />
                <Stack.Screen
                    name="Cadastro"
                    component={Cadastro}
                    options={{ title: 'Cadastro de Treinador' }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Minha Pokédex' }}
                />
                <Stack.Screen
                    name="Detalhes"
                    component={Detalhes}
                    options={{ title: 'Detalhes do Pokémon' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}