import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Amenities from "../components/Amenities";
import roomService from "../services/roomService"; 

const PropertyInfoScreen = () => {
  const route = useRoute();
  console.log("por aca", route.params);
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar la imagen
  const loadImage = (uri, width = 100, height = 80, borderRadius = 4) => {
    return (
      <View style={{ margin: 6 }}>
        <Image
          style={{
            width: width,
            height: height,
            borderRadius: borderRadius,
          }}
          source={{ uri: uri }}
        />
      </View>
    );
  };

  // Obtener habitaciones al montar el componente
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await roomService.getRoomsByHotelId(route.params.hotel_id);
        console.log("Roomspor aca:", response.result);
        setRooms(response.result); // Guardar las habitaciones en el estado
      } catch (error) {
        setError("Error al cargar habitaciones");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [route.params.hotel_id]);

  // Configuración del encabezado
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `${route.params.name}`,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, [navigation]);

  // Calcular descuento
  const difference = route.params.oldPrice - route.params.newPrice;
  const offerPrice = (Math.abs(difference) / route.params.oldPrice) * 100;

  // Manejar el estado de carga
  if (loading) {
    return <ActivityIndicator size="large" color="#003580" />;
  }

  // Manejar el estado de error
  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <Pressable
            style={{ flexDirection: "row", flexWrap: "wrap", margin: 10 }}
          >
            {/* Verifica si photos existe y es un array antes de usar slice */}
            {Array.isArray(route.params.photos) ? (
              route.params.photos.slice(0, 5).map((photo, index) => {
                // Asegúrate de que photo.image también esté definido
                return loadImage(photo, 100, 80, 4);
              })
            ) : (
              <Text>No hay fotos disponibles</Text>
            )}
          </Pressable>

          <View
            style={{
              marginHorizontal: 12,
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {route.params.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 7,
                }}
              >
                <MaterialIcons name="stars" size={24} color="green" />
                <Text>{route.params.rating}</Text>
                <View
                  style={{
                    backgroundColor: "#003580",
                    paddingVertical: 3,
                    borderRadius: 5,
                    width: 100,
                  }}
                ></View>
              </View>
            </View>
          </View>

          <Text
            style={{
              borderColor: "#E0E0E0",
              borderWidth: 3,
              height: 1,
              marginTop: 15,
            }}
          />
          <Text
            style={{
              marginTop: 10,
              fontSize: 17,
              fontWeight: "500",
              marginHorizontal: 12,
            }}
          >
            Precio por 1 Noche y {route.params.adults} adultos
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 12,
              marginTop: 4,
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 20 }}>
              $ {route.params.price * route.params.adults}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 12,
              marginTop: 7,
              backgroundColor: "green",
              paddingHorizontal: 4,
              paddingVertical: 5,
              width: 78,
              borderRadius: 4,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              {offerPrice.toFixed(0)} % OFF
            </Text>
          </View>

          <Text
            style={{
              borderColor: "#E0E0E0",
              borderWidth: 3,
              height: 1,
              marginTop: 15,
            }}
          />
          <View
            style={{
              margin: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 60,
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
                Check In
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
              >
                {route.params.selectedDates.startDate.startDate}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
                Check Out
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
              >
                {route.params.selectedDates.startDate.endDate}
              </Text>
            </View>
          </View>

          <View style={{ margin: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
              Habitación y Huespedes
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
            >
            {Array.isArray(rooms) ? rooms.length : 0} rooms disponibles
            </Text>
          </View>

          <Text
            style={{
              borderColor: "#E0E0E0",
              borderWidth: 3,
              height: 1,
              marginTop: 15,
            }}
          />
          <Amenities />

          <Text
            style={{
              borderColor: "#E0E0E0",
              borderWidth: 3,
              height: 1,
              marginTop: 15,
            }}
          />
        </ScrollView>
      </SafeAreaView>

      <Pressable
        onPress={() =>
          navigation.navigate("Rooms", {
            rooms: rooms, // Pasa las habitaciones obtenidas al siguiente screen
            oldPrice: route.params.oldPrice,
            newPrice: route.params.newPrice,
            name: route.params.name,
            children: route.params.children,
            adults: route.params.adults,
            rating: route.params.rating,
            startDate: route.params.selectedDates.startDate.startDate,
            endDate: route.params.selectedDates.startDate.endDate,
          })
        }
        style={{
          backgroundColor: "#003580",
          position: "absolute",
          bottom: 20,
          padding: 15,
          width: "95%",
          marginHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 17,
          }}
        >
          Seleccione disponibilidad
        </Text>
      </Pressable>
    </>
  );
};

export default PropertyInfoScreen;

const styles = StyleSheet.create({});
