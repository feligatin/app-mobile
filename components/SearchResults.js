import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SearchResults = ({ data, input, setInput, setId }) => {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 10 }}>
      <FlatList 
        data={data.filter(item => {
          // Validar que item.name e input sean cadenas de texto antes de usarlas
          const itemName = typeof item.name === 'string' ? item.name.toLowerCase() : ''; 
          const searchInput = typeof input === 'string' ? input.toLowerCase() : ''; 
          return itemName.includes(searchInput);
        })} 
        renderItem={({ item }) => {
          if (!input) {
            return null; // No mostrar nada si el input está vacío
          }

          return (
            <Pressable 
            onPress={() => {
                setInput(item.name);
                setId(item.hotel_id);
                navigation.navigate("Home", {
                  input: item.name,
                  id: item.hotel_id, // Pasa el ID del hotel
                });
              }} 
              style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
            >
              <View>
                {/* Usar un valor por defecto si 'item.image' no está definido */}
                <Image 
                  style={{ width: 70, height: 70 }} 
                  source={{ uri: item.image ? `https://qazigohotelesstorage.blob.core.windows.net/images/${item.image}` : 'https://default-image-url.com/default.jpg' }} 
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                {/* Mostrar el nombre del hotel */}
                <Text style={{ fontSize: 15, fontWeight: "500" }}>{item.name || 'Nombre no disponible'}</Text>
                {/* Mostrar descripción si existe */}
                <Text style={{ marginVertical: 4 }}>{item.description || 'Descripción no disponible'}</Text>
                {/* Mostrar el número de propiedades */}
                <Text style={{ color: "gray", fontSize: 15 }}>{item.rooms || 'Habitaciones no disponibles'}</Text>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => index.toString()} // Añadir una clave única para cada elemento
        ListEmptyComponent={() => {
          if (!input) return null;
          return <Text style={{ color: 'gray', fontSize: 16 }}>No se encontraron resultados.</Text>;
        }}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
