import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState, useEffect, useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import PropertyCard from "../components/PropertyCard";
import { BottomModal } from "react-native-modals";
import { ModalFooter } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { ModalTitle } from "react-native-modals";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { ModalContent } from "react-native-modals";
import HotelService from "../services/hotelService"; // Importa tu servicio

const PlacesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [modalVisibile, setModalVisibile] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [sortedData, setSortedData] = useState([]);
  console.log("hotels entrando", hotels);
  const hotelId = route.params?.id; // Obtener el id del hotel desde los parámetros de la ruta
  const hotels = route.params?.place;
  console.log("acaentra", hotels);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Lugares populares",
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

  useEffect(() => {
    // Simulación de la carga de datos desde tu API
  }, );

  // Filtrar los hoteles para obtener solo el que coincide con el `hotelId` recibido
  const filteredPlaces = useMemo(() => {
    return hotels.filter((hotel) => hotel.hotel_id === hotelId);
  }, [hotels, hotelId]);

  // Aplicar filtros de precio
  useEffect(() => {
    let sorted = [...filteredPlaces];
    if (selectedFilter === "Costo: Alto a Bajo") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (selectedFilter === "Costo: Bajo a Alto") {
      sorted.sort((a, b) => a.price - b.price);
    }
    setSortedData(sorted);
  }, [selectedFilter, filteredPlaces]);

  const applyFilter = (filter) => {
    setSelectedFilter(filter);
    setModalVisibile(false);
  };

  return (
    <View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          padding: 12,
          backgroundColor: "white",
        }}
      >
        <Pressable
          onPress={() => setModalVisibile(!modalVisibile)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Octicons name="arrow-switch" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Ordenar
          </Text>
        </Pressable>

        <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="filter" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Filtrar
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate("Map", {
              searchResults: filteredPlaces,
            })
          }
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome5 name="map-marker-alt" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Mapa
          </Text>
        </Pressable>
      </Pressable>

      {loading ? (
        <Text>Fetching places....</Text>
      ) : (
        <ScrollView style={{ backgroundColor: "#F5F5F5" }}>
          {hotels.map((hotel, index) => (
            <PropertyCard
              key={hotel.hotel_id || index}
              rooms={hotel.rooms}
              children={route.params.children}
              adults={route.params.adults}
              selectedDates={route.params.selectedDates}
              property={{
                name: hotel.name || "Sin nombre",
                city: hotel.city || "Sin ciudad",
                price: hotel.price,
                image: 'https://zigohotelesstorage.blob.core.windows.net/images/' + hotel.image,
                services: hotel.services,
                rating: hotel.number_stars,
                hotel_id: hotel.hotel_id,
                availableRooms: hotel.rooms,
              }}
            />
          ))}
        </ScrollView>
      )}

      <BottomModal
        onBackdropPress={() => setModalVisibile(!modalVisibile)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        footer={
          <ModalFooter>
            <Pressable
              onPress={() => applyFilter(selectedFilter)}
              style={{
                paddingRight: 10,
                marginLeft: "auto",
                marginRight: "auto",
                marginVertical: 10,
                marginBottom: 30,
              }}
            >
              <Text>Aplicar</Text>
            </Pressable>
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Ordenar y filtrar" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
        visible={modalVisibile}
        onTouchOutside={() => setModalVisibile(!modalVisibile)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginVertical: 10,
                flex: 2,
                height: 280,
                borderRightWidth: 1,
                borderColor: "#E0E0E0",
              }}
            >
              <Text style={{ textAlign: "center" }}>Ordenar </Text>
            </View>

            <View style={{ flex: 3, margin: 10 }}>
              {["Costo: Bajo a Alto", "Costo: Alto a Bajo"].map(
                (filter, index) => (
                  <Pressable
                    onPress={() => setSelectedFilter(filter)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 10,
                    }}
                    key={index}
                  >
                    {selectedFilter === filter ? (
                      <FontAwesome name="circle" size={18} color="green" />
                    ) : (
                      <Entypo name="circle" size={18} color="black" />
                    )}

                    <Text
                      style={{ fontSize: 16, fontWeight: "500", marginLeft: 6 }}
                    >
                      {filter}
                    </Text>
                  </Pressable>
                )
              )}
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({});
