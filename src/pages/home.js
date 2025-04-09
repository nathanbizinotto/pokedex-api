import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

export default function Home({ navigation }) {
  const [pokemonNome, setPokemonNome] = useState('');
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const carregarPokemonsSalvos = async () => {
      try {
        const dados = await AsyncStorage.getItem('meusPokemons');
        if (dados) {
          setPokemons(JSON.parse(dados));
        }
      } catch (error) {
        console.error('Erro ao carregar pokémons salvos:', error);
      }
    };

    carregarPokemonsSalvos();
  }, []);

  const salvarPokemons = async (lista) => {
    try {
      await AsyncStorage.setItem('meusPokemons', JSON.stringify(lista));
    } catch (error) {
      console.error('Erro ao salvar pokémons:', error);
    }
  };

  const buscarPokemon = async () => {
    if (!pokemonNome.trim()) {
      Alert.alert('Erro', 'Digite o nome de um Pokémon');
      return;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonNome.toLowerCase()}`
      );
      const data = response.data;

      const novoPokemon = {
        id: data.id,
        nome: data.name,
        imagem: data.sprites.front_default,
        detalhes: data,
      };

      const jaExiste = pokemons.find((p) => p.id === novoPokemon.id);
      if (jaExiste) {
        Alert.alert('Aviso', 'Esse Pokémon já está na lista');
        return;
      }

      const novaLista = [...pokemons, novoPokemon];
      setPokemons(novaLista);
      salvarPokemons(novaLista);
      setPokemonNome('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Pokémon não encontrado');
    }
  };

  const excluirPokemon = (id) => {
    const novaLista = pokemons.filter((p) => p.id !== id);
    setPokemons(novaLista);
    salvarPokemons(novaLista);
  };

  const verMaisDetalhes = (pokemon) => {
    navigation.navigate('Detalhes', { pokemon });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Pokédex</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do Pokémon"
          placeholderTextColor="#555"
          value={pokemonNome}
          onChangeText={setPokemonNome}
        />
        <TouchableOpacity style={styles.button} onPress={buscarPokemon}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {pokemons.map((pokemon) => (
          <View key={pokemon.id} style={styles.card}>
            <Image
              source={{ uri: pokemon.imagem }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.cardText}>{pokemon.nome.toUpperCase()}</Text>

            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={[styles.cardButton, { backgroundColor: '#F44336' }]}
                onPress={() => excluirPokemon(pokemon.id)}
              >
                <Text style={styles.cardButtonText}>EXCLUIR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.cardButton, { backgroundColor: '#1976D2' }]}
                onPress={() => verMaisDetalhes(pokemon)}
              >
                <Text style={styles.cardButtonText}>VER MAIS</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EF5350',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#212121',
  },
  button: {
    backgroundColor: '#FFEB3B',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#212121',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardsContainer: {
    paddingBottom: 100,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 8,
  },
  cardButtons: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  cardButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  cardButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});