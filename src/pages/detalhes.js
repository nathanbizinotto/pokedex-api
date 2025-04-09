import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView
} from "react-native";

export default function Detalhes({ route }) {
    const { pokemon } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.content} style={styles.container}>
            <Text style={styles.title}>{pokemon.nome.toUpperCase()}</Text>

            <Image
                source={{ uri: pokemon.detalhes.sprites.other['official-artwork'].front_default }}
                style={styles.image}
                resizeMode="contain"
            />

            <View style={styles.infoBox}>
                <Text style={styles.label}>Tipos:</Text>
                <Text style={styles.value}>
                    {pokemon.detalhes.types.map((t) => t.type.name).join(', ')}
                </Text>

                <Text style={styles.label}>Altura:</Text>
                <Text style={styles.value}>{pokemon.detalhes.height / 10} m</Text>

                <Text style={styles.label}>Peso:</Text>
                <Text style={styles.value}>{pokemon.detalhes.weight / 10} kg</Text>

                <Text style={styles.label}>Habilidades:</Text>
                <Text style={styles.value}>
                    {pokemon.detalhes.abilities.map((a) => a.ability.name).join(', ')}
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EF5350',
    },
    content: {
        padding: 20,
        alignItems: "center",
        paddingBottom: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    infoBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        width: '100%',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#EF5350',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        color: '#212121',
    },
});