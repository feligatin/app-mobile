import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Amenities from "../components/Amenities";

const RoomsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log("por aca", route.params);
  console.log(route.params.rooms);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Habitaciones disponibles",
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

  const [selected, setSelected] = useState([]);

  // Asegurarse de que `rooms` esté definido y sea un array
  const rooms = route.params?.rooms.data || [];
  console.log("rooms locos", rooms);
  return (
    <>
      <ScrollView>
        {rooms.length > 0 ? (
          rooms.map((item, index) => (
            <Pressable
              style={{ margin: 10, backgroundColor: "white", padding: 10 }}
              key={index}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#007FFF", fontSize: 17, fontWeight: "500" }}
                >
                  {item.name}
                </Text>
                <AntDesign name="infocirlceo" size={24} color="#007FFF" />
              </View>
              <Text style={{ marginTop: 3, fontSize: 16 }}>
                Pago en la propiedad
              </Text>
              <Text style={{ marginTop: 3, color: "green", fontSize: 16 }}>
                Cancelación gratuita
              </Text>
              <View
                style={{
                  marginTop: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text style={{ fontSize: 18 }}>$ {item.price}</Text>
              </View>
              <Amenities />

              {selected.includes(item.name) ? (
                <Pressable
                  style={{
                    borderColor: "#318CE7",
                    backgroundColor: "#F0F8FF",
                    borderWidth: 2,
                    width: "100%",
                    padding: 10,
                    borderRadius: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                      color: "#318CE7",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    RESERVADO
                  </Text>
                  <Entypo
                    onPress={() => setSelected([])}
                    name="circle-with-cross"
                    size={24}
                    color="red"
                  />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => setSelected([item.name])}
                  style={{
                    borderColor: "#007FFF",
                    borderWidth: 2,
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "700",
                      fontSize: 16,
                      color: "#007FFF",
                    }}
                  >
                    RESERVAR
                  </Text>
                </Pressable>
              )}
            </Pressable>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No hay habitaciones disponibles.
          </Text>
        )}
      </ScrollView>

      {selected.length > 0 && (
        <Pressable
          onPress={() =>
            navigation.navigate("Confirmation", {
              oldPrice: route.params.oldPrice,
              newPrice: route.params.newPrice,
              name: route.params.name,
              children: route.params.children,
              adults: route.params.adults,
              rating: route.params.rating,
              startDate: route.params.startDate,
              endDate: route.params.endDate,
              rooms: selected,
            })
          }
          style={{
            backgroundColor: "#003580",
            padding: 8,
            marginBottom: 30,
            borderRadius: 10,
            marginHorizontal: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            RESERVAR
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default RoomsScreen;

const styles = StyleSheet.create({});
