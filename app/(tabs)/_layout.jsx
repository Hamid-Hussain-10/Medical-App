import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, StyleSheet } from "react-native";

import HomeScreen from "./HomeScreen";
import PrescriptionScreen from "./PrescriptionScreen";
import FindDoctorScreen from "./FindDoctorScreen";
import MoreScreen from "./MoreScreen";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#047857",
          height: 70,
          paddingBottom: 5,
          // paddingVertical: 5,
        },
        tabBarLabelStyle: {
          color: "white",
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
              style={{ width: 26, height: 26 }}
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
              style={{ width: 26, height: 26 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Action"
        component={FindDoctorScreen}
        options={{
          tabBarIcon: () => (
            <View style={styles.centerButton}>
              <View style={styles.centerButtonInner}>
                <Image
                  source={require("../../assets/images/3.png")}
                  style={{ width: 28, height: 28 }}
                />
              </View>
            </View>
          ),

        }}
      />

      <Tab.Screen
        name="FindDoctor"
        component={FindDoctorScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/4.png")}
              style={{ width: 26, height: 26 }}
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
              source={require("../../assets/images/5.png")}
              style={{ width: 26, height: 26 }}
            />
          ),
          tabBarBadge: 5,
          tabBarBadgeStyle: {
            position: "relative",
            top: -10,
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  centerButton: {
    top: -20, // move up
    justifyContent: "center",
    alignItems: "center",
  },
  centerButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#047857",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
});
