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
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import hotelService from "../services/hotelService";  
import PropTypes from "prop-types";

const PropertyCard = ({ rooms, children, adults, selectedDates, property }) => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  
  const handlePress = async () => {
    setLoading(true); 
    try {
      const response = await hotelService.getHotelById(property.hotel_id); 
      const hotelDetails = response.result.data; 

      const hotel = hotelDetails?.hotel?.[0];
      let imageUrls = [];
      if (hotel?.images) {
        const imagesString = hotel.images;
        const imageNames = imagesString.split(",");
        const baseUrl = "https://zigohotelesstorage.blob.core.windows.net/images/";
        imageUrls = imageNames.map(imageName => `${baseUrl}${imageName.trim()}`);
      } else {
        console.error("No se encontraron imágenes para el hotel.");
      }

      navigation.navigate("Info", {
        name: hotel.tradename,
        rating: hotel.number_stars,
        price: property.price,
        photos: imageUrls, 
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
      setLoading(false); 
    }
  };

  return (
    <View>
      <Pressable
        key={property.id}
        onPress={handlePress} 
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


PropertyCard.propTypes = {
  rooms: PropTypes.number.isRequired,
  children: PropTypes.number.isRequired,
  adults: PropTypes.number.isRequired,
  selectedDates: PropTypes.array.isRequired,
  property: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    hotel_id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    address: PropTypes.string,
    price: PropTypes.number.isRequired,
    availableRooms: PropTypes.number.isRequired,
  }).isRequired,
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
