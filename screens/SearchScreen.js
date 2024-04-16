import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import SearchResults from "../components/SearchResults";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import NetInfo from "@react-native-community/netinfo";

const SearchScreen = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length > 0) return;

    const fetchProducts = async () => {
      const isConnected = await NetInfo.fetch().then(state => state.isConnected);
      
      if (isConnected) {
        try {
          const docsSnap = await getDocs(collection(db, "places"));
          const fetchedItems = [];
          docsSnap.forEach((doc) => {
            fetchedItems.push(doc.data());
          });
          setItems(fetchedItems);
        } catch (error) {
          console.error("Error al obtener documentos: ", error);
        }
      } else {
        console.error("No internet connection");
      }
    };

    fetchProducts();
  }, [items]);
  console.log("items", items);
  console.log("input", input);
  console.log("setInput", setInput);

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
          onChangeText={(text) => setInput(text)}
          placeholder="¿A dónde te gustaría ir?"
        />
        <Feather name="search" size={22} color="black" />
      </View>

      <SearchResults data={items} input={input} setInput={setInput} />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
