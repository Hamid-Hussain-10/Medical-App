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
          paddingVertical: 15,
          paddingHorizontal: 5,
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
          tabBarLabel: "", 
          tabBarIcon: () => (
            <View style={styles.centerButton}>
              <View style={styles.halfview}>
                <View style={styles.centerButtonInner}>
                  <Image
                    source={require("../../assets/images/3.png")}
                    style={{ width: 32, height: 32, tintColor: "#fff" }}
                  />
                </View>
              </View>
            </View>
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
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  halfview: {
    width: 95,
    height: 55,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderWidth: 10,
    borderColor: "#E4E4E4",
    backgroundColor: "#E4E4E4",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 6,
  },
  centerButtonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: "#fff",
    backgroundColor: "#047857",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    bottom: 20,
  },
});
