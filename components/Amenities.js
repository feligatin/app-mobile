import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Amenities = () => {
  const services = [
    { id: "0", name: "Desayuno incluido" },
    { id: "2", name: "WIFI" },
    { id: "3", name: "Aire acondicionado" },
    { id: "4", name: "Estacionamiento gratuito" },
    { id: "5", name: "Piscina" },
    { id: "6", name: "Restaurante" },
    { id: "7", name: "Bar" },
  ];

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 17, fontWeight: "600" }}>
        Amenities más populares
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}
      >
        {services.map((item) => (
          <View
            style={{
              margin: 10,
              backgroundColor: "#007FFF",
              paddingHorizontal: 11,
              paddingVertical: 5,
              borderRadius: 25,
            }}
            key={item.id}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Amenities;

const styles = StyleSheet.create({});
