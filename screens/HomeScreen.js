import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import Header from "../components/Header";
import DatePicker from "react-native-date-ranges";
import { BottomModal, ModalFooter, ModalButton, ModalTitle, SlideAnimation, ModalContent } from "react-native-modals";
import NetInfo from "@react-native-community/netinfo";
import HotelService from "../services/hotelService"; // Importa el servicio de hoteles

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Inicializar valores predeterminados si los parámetros no están disponibles
  const input = route.params?.input || '';
  const hotelId = route.params?.id || null;

  // Estados locales
  const [selectedDates, setSelectedDates] = useState();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Reserva",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        alignSelf: "center",
        marginTop: 40,
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 100,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);

  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: { width: "80%", marginHorizontal: "3%" },
          text: { fontSize: 20 },
        }}
        primary
        title="Confirmar"
      />
    );
  };

  const fetchHotels = async () => {
    const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
    if (!isConnected) {
      Alert.alert("Sin conexión", "No hay conexión a internet.");
      return;
    }

    if (hotelId) {
      try {
        console.log("Obteniendo hoteles...", hotelId);
        const response = await HotelService.getHotels(hotelId);
        console.log("Respuesta del servicio de hoteles:", response);
        console.log(response.result.data);
        if (response && response.result && response.result.data) {
          navigation.navigate("Places", {
            rooms,
            adults,
            children,
            selectedDates,
            place: response.result.data,
          });
        } else {
          console.error("Estructura de respuesta inesperada:", response);
        }
      } catch (error) {
        console.error("Error al obtener los hoteles: ", error);
        Alert.alert("Error", "Hubo un problema al obtener los datos del hotel.");
      }
    } else {
      Alert.alert("Error", "No se ha seleccionado ningún hotel.");
    }
  };

  return (
    <>
      <View>
        <Header />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              margin: 20,
              borderColor: "#FFC72C",
              borderWidth: 3,
              borderRadius: 6,
            }}
          >
            {/* Campo de destino (Ciudad) */}
            <Pressable
              onPress={() => navigation.navigate("Search")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="search" size={24} color="black" />
              <TextInput
                defaultValue={input}
                placeholder="¿A dónde quieres ir?"
                placeholderTextColor="black"
                editable={false}
              />
            </Pressable>

            {/* Selección de Fechas */}
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="calendar" size={24} color="black" />
              <DatePicker
                style={{
                  width: 350,
                  height: 30,
                  borderRadius: 0,
                  borderWidth: 0,
                  borderColor: "transparent",
                }}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                  headerStyle: {
                    backgroundColor: "#003580",
                  },
                  contentText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                }}
                selectedBgColor="#0047AB"
                customButton={(onConfirm) => customButton(onConfirm)}
                onConfirm={(startDate, endDate) =>
                  setSelectedDates({ startDate, endDate })
                }
                allowFontScaling={false}
                placeholder="Ingresa la fecha de llegada y salida"
                mode="range"
              />
            </Pressable>

            {/* Selección de Habitaciones y Huéspedes */}
            <Pressable
              onPress={() => setModalVisible(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput
                placeholderTextColor="red"
                editable={false}
                defaultValue={` ${rooms} Habitación • ${adults} Adultos • ${children} Niños`}
              />
            </Pressable>

            {/* Botón de Buscar */}
            <Pressable
              onPress={fetchHotels}
              style={{
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: "#2a52be",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                  color: "white",
                }}
              >
                Buscar
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {/* Modal para seleccionar habitaciones y huéspedes */}
      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Aplicar"
              style={{
                marginBottom: 20,
                color: "white",
                backgroundColor: "#003580",
              }}
              onPress={() => setModalVisible(false)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Seleccionar habitaciones y huéspedes" />}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onHardwareBackPress={() => setModalVisible(false)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(false)}
      >
        <ModalContent style={{ width: "100%", height: 310 }}>
          {/* Selección de habitaciones, adultos y niños */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Habitaciones</Text>
            <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable onPress={() => setRooms(Math.max(1, rooms - 1))} style={styles.counterButton}>
                <Text style={styles.counterText}>-</Text>
              </Pressable>
              <Text style={styles.counterValue}>{rooms}</Text>
              <Pressable onPress={() => setRooms(rooms + 1)} style={styles.counterButton}>
                <Text style={styles.counterText}>+</Text>
              </Pressable>
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Adultos</Text>
            <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable onPress={() => setAdults(Math.max(1, adults - 1))} style={styles.counterButton}>
                <Text style={styles.counterText}>-</Text>
              </Pressable>
              <Text style={styles.counterValue}>{adults}</Text>
              <Pressable onPress={() => setAdults(adults + 1)} style={styles.counterButton}>
                <Text style={styles.counterText}>+</Text>
              </Pressable>
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Niños</Text>
            <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable onPress={() => setChildren(Math.max(0, children - 1))} style={styles.counterButton}>
                <Text style={styles.counterText}>-</Text>
              </Pressable>
              <Text style={styles.counterValue}>{children}</Text>
              <Pressable onPress={() => setChildren(children + 1)} style={styles.counterButton}>
                <Text style={styles.counterText}>+</Text>
              </Pressable>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

// Estilos para los contadores de habitaciones, adultos y niños
const styles = StyleSheet.create({
  counterButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 20,
    fontWeight: "600",
  },
  counterValue: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 6,
  },
});

export default HomeScreen;
