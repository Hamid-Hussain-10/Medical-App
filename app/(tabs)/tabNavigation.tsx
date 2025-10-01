import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

// Screens
import HomeScreen from "./HomeScreen";
import PrescriptionScreen from "./PrescriptionScreen";
import FindDoctorScreen from "./FindDoctorScreen";
import MoreScreen from "./MoreScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 65,
          paddingBottom: 8,
        },
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/1.png")}
              style={{ width: 26, height: 26, resizeMode: "contain" }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Prescription"
        component={PrescriptionScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/2.png")}
              style={{ width: 26, height: 26, resizeMode: "contain" }}
            />
          ),
        }}
      />

      {/* Floating center button */}
      <Tab.Screen
        name="Action"
        component={FindDoctorScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/3.png")}
              style={{ width: 32, height: 32, resizeMode: "contain" }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Find Doctor"
        component={FindDoctorScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/4.png")}
              style={{ width: 26, height: 26, resizeMode: "contain" }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/1.png")}
              style={{ width: 26, height: 26, resizeMode: "contain" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// const styles = StyleSheet.create({
//   centerButton: {
//     top: -20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   centerButtonInner: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#047857",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 6,
//     elevation: 5,
//   },
// });
