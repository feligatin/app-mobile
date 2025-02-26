import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticationService from '../services/authenticationService';


const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // Función para el inicio de sesión
  const handleLogin = async () => {
    try {
      console.log(username, password);
      const response = await AuthenticationService.login(username, password);
      // Guardar el token en AsyncStorage
      console.log(response.result.data);
      await AsyncStorage.setItem('token', response.result.data);
      navigation.replace("Main");
      Alert.alert('Inicio de sesión exitoso');
    } catch (error) {
      Alert.alert('Error', error);
    }
  };
  

  useEffect(() => {
    // Aquí puedes verificar si el usuario ya está autenticado
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ color: "#003580", fontSize: 17, fontWeight: "700" }}>
            Iniciar Sesión
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
              Username
            </Text>

            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder="Correo Electrónico"
              placeholderTextColor={"gray"}
              style={{
                fontSize: username ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
              Contraseña
            </Text>

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Colocar mínimo 6 caracteres"
              placeholderTextColor={"gray"}
              style={{
                fontSize: password ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>
        </View>

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "#003580",
            padding: 15,
            borderRadius: 7,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Ingresar
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
