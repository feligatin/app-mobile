import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Alert,
  RefreshControl
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";
import { BottomModal } from "react-native-modals";
import { ModalFooter } from "react-native-modals";
import { ModalButton } from "react-native-modals";
import { ModalTitle } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";

const HomeScreen = () => {
  console.log("entra acasito?");
  const navigation = useNavigation();
  const [selectedDates, setSelectedDates] = useState();
  const route = useRoute();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [modalVisibile, setModalVisibile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Reserva",
      headerTitleAlign: "center", // Center the header title
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        alignSelf: "center", // Align the header title within its container
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
        title="Submit"
      />
    );
  };
  console.log(route.params);

  const searchPlaces = (place) => {
    if(!route.params || !selectedDates){
      Alert.alert(
        "Invalid Details",
        "Please enter all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    console.log(place);
    if(route.params && selectedDates){
      navigation.navigate("Places",{
        rooms:rooms,
        adults:adults,
        children:children,
        selectedDates:selectedDates,
        place:place
      })
    }
  };

  return (
    <>
      <View>
        <Header />

        <ScrollView
          contentContainerStyle={{flexGrow:1}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
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
            {/* Destination */}
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
                placeholderTextColor="black"
                placeholder={
                  route?.params ? route.params.input : "¿A dónde quieres ir?"
                }
                editable={false}
              />
            </Pressable>

            {/* Selected Dates */}
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
                  setSelectedDates(startDate, endDate)
                }
                allowFontScaling={false}
                placeholder={"Ingresa la fecha de llegada y salida"}
                mode={"range"}
              />
            </Pressable>

            {/* Rooms and Guests */}
            <Pressable
              onPress={() => setModalVisibile(!modalVisibile)}
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
                placeholder={` ${rooms} room • ${adults} adults • ${children} Children`}
              />
            </Pressable>

            {/* Search Button */}
            <Pressable
              onPress={() => searchPlaces(route?.params.input)}
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

      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisibile(!modalVisibile)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={{
                marginBottom: 20,
                color: "white",
                backgroundColor: "#003580",
              }}
              onPress={() => setModalVisibile(!modalVisibile)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select rooms and guests" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
        visible={modalVisibile}
        onTouchOutside={() => setModalVisibile(!modalVisibile)}
      >
        <ModalContent style={{ width: "100%", height: 310 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Rooms</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setRooms(Math.max(1, rooms - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {rooms}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setRooms((c) => c + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Adults</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setAdults(Math.max(1, adults - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {adults}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setAdults((c) => c + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Children</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setChildren(Math.max(0, children - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {children}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setChildren((c) => c + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
