import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import hotelService from "../services/hotelService";  // Asegúrate de importar tu servicio de hoteles

const PropertyCard = ({
  rooms,
  children,
  adults,
  selectedDates,
  property,
}) => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // Estado para indicar si está cargando
  
  // Función para obtener los detalles del hotel por id
  const handlePress = async () => {
    setLoading(true); // Mostrar el indicador de carga
    try {
      const response = await hotelService.getHotelById(property.hotel_id); // Llamada al backend
      const hotelDetails = response.result.data; // Asegúrate de que la estructura sea la correcta
      console.log("Hotel details:", hotelDetails);
      console.log("Hotel images:", hotelDetails.hotel[0].images);
      const hotel = hotelDetails?.hotel?.[0];
      let  imageUrls = [];
      if (hotel && hotel.images) {
        const imagesString = hotel.images;
      
        // Dividir las imágenes en un array si están separadas por comas
        const imageNames = imagesString.split(',');
      
        // Suponiendo que la URL base es:
        const baseUrl = 'https://zigohotelesstorage.blob.core.windows.net/images/';
      
        // Crear URLs completas para cada imagen
           imageUrls = imageNames.map(imageName => `${baseUrl}${imageName.trim()}`);
      
        console.log("Imágenes del hotel:", imageUrls);
      
        // Aquí puedes usar imageUrls en tu componente para mostrar las imágenes
      } else {
        console.error("No se encontraron imágenes para el hotel.");
      }
      // Navega a la pantalla "Info" pasando los detalles del hotel
      console.log("Hotel property:", property);
      navigation.navigate("Info", {
        name: hotel.tradename,
        rating: hotel.number_stars,
        price: property.price,
        photos: imageUrls, // Aquí se pasan las fotos obtenidas del backend
        availableRooms: property.availableRooms,
        adults: adults,
        children: children,
        rooms: rooms,
        selectedDates: selectedDates,
        hotel_id: property.hotel_id
      });
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    } finally {
      setLoading(false); // Dejar de mostrar el indicador de carga
    }
  };

  return (
    <View>
      <Pressable
        key={property.id}
        onPress={handlePress} // Aquí hacemos la llamada al backend al presionar la tarjeta
        style={{ margin: 15, flexDirection: "row", backgroundColor: "white" }}
      >
        <View>
          <Image
            style={{ height: height / 4, width: width - 280 }}
            source={{ uri: property.image }}
          />
        </View>

        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ width: 200 }}>{property.name}</Text>
            <AntDesign name="hearto" size={24} color="red" />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginTop: 7,
            }}
          >
            <MaterialIcons name="stars" size={24} color="green" />
            <Text>{property.rating}</Text>
            <View
              style={{
                backgroundColor: "#6CB4EE",
                paddingVertical: 3,
                borderRadius: 5,
                width: 100,
              }}
            ></View>
          </View>

          <Text
            style={{
              width: 210,
              marginTop: 6,
              color: "gray",
              fontWeight: "bold",
            }}
          >
            {property.address && property.address.length > 50
              ? property.address.substr(0, 50)
              : property.address}
          </Text>

          <Text style={{ marginTop: 4, fontSize: 15, fontWeight: "500" }}>
            Precio para {adults} adulto
          </Text>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 18 }}>
              $ {property.price * adults}
            </Text>
          </View>

          <View style={{ marginTop: 6 }}>
            <Text style={{ fontSize: 16, color: "gray" }}>Habitación de Lujo</Text>
            <Text style={{ fontSize: 16, color: "gray" }}>
              Cuartos : 1 Cama
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#6082B6",
              paddingVertical: 2,
              marginTop: 2,
              borderRadius: 5,
              width: 150,
              paddingHorizontal: 3,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Oferta por tiempo limitado
            </Text>
          </View>
        </View>
      </Pressable>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});
