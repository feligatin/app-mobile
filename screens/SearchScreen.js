import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation para la navegación
import CatalogService from "../services/catalogService";

const SearchScreen = () => {
  const [input, setInput] = useState(""); // Estado para manejar el input del usuario
  const [suggestions, setSuggestions] = useState([]); // Estado para almacenar las sugerencias
  const navigation = useNavigation(); // Hook de navegación

  // Función para obtener sugerencias de ciudades filtradas según el input
  const fetchSuggestions = async (search) => {
    if (!search) {
      setSuggestions([]); // Vaciar las sugerencias si no hay texto
      return;
    }

    try {
      const response = await CatalogService.findAllCities(); // Llama a la API para obtener todas las ciudades
      if (response && response.result && response.result.data) {
        const cities = response.result.data;

        // Filtra las ciudades para que coincidan con el input del usuario
        const filteredCities = cities.filter((city) =>
          city.publicName.toLowerCase().includes(search.toLowerCase())
        );

        setSuggestions(filteredCities); // Actualiza las sugerencias
      } else {
        console.error("Estructura de respuesta inesperada:", response);
      }
    } catch (error) {
      console.error("Error al obtener sugerencias: ", error);
    }
  };

  // Manejar cambios en el input y obtener sugerencias
  const handleInputChange = (text) => {
    setInput(text);
    fetchSuggestions(text); // Filtrar las ciudades basadas en el texto ingresado
  };

  // Manejar la selección de una sugerencia
  const handleSuggestionSelect = (suggestion) => {
    setInput(suggestion.publicName); // Establecer el nombre de la ciudad seleccionada
    setSuggestions([]); // Limpiar las sugerencias

    // Navegar al Home con la ciudad seleccionada
    navigation.navigate("Home", {
      input: suggestion.publicName, // Pasar el nombre de la ciudad
      id: suggestion.id, // Pasar el ID de la ciudad
    });
  };

  return (
    <SafeAreaView style={{ marginTop: 60 }}>
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#FFC72C",
          borderWidth: 4,
          borderRadius: 10,
        }}
      >
        <TextInput
          value={input}
          onChangeText={handleInputChange} // Llamar a la función cuando cambie el texto
          placeholder="¿A dónde te gustaría ir?"
          style={{ flex: 1, paddingRight: 10 }} // Estilo para permitir que el ícono esté alineado
        />
        <Feather name="search" size={22} color="black" />
      </View>

      {/* Mostrar sugerencias de autocompletado */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSuggestionSelect(item)} // Manejar selección de sugerencia
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            >
              {/* Asegurarse de que todo el texto esté dentro de <Text> */}
              <Text>{item.publicName ? item.publicName : "Sin nombre"}</Text>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
