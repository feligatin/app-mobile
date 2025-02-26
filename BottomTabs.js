import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const renderHomeIcon = ({ focused }) =>
  focused ? (
    <Entypo name="home" size={24} color="#003580" />
  ) : (
    <AntDesign name="home" size={24} color="black" />
  );

const renderBookingsIcon = ({ focused }) =>
  focused ? (
    <Ionicons name="notifications" size={24} color="#003580" />
  ) : (
    <Ionicons name="notifications-outline" size={24} color="black" />
  );

const renderProfileIcon = ({ focused }) =>
  focused ? (
    <Ionicons name="person" size={24} color="#003580" />
  ) : (
    <Ionicons name="person-outline" size={24} color="black" />
  );

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Inicio",
          headerShown: false,
          tabBarIcon: renderHomeIcon, 
        }}
      />

      <Tab.Screen
        name="Bookings"
        component={BookingScreen}
        options={{
          tabBarLabel: "Reservas",
          headerShown: false,
          tabBarIcon: renderBookingsIcon, 
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Perfil",
          headerShown: false,
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
