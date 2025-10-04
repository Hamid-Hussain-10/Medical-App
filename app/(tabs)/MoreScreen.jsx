import { View, Text, StyleSheet } from "react-native";
import React from "react";

const MoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>More Screen</Text>
      <Text style={styles.subtitle}>
        More Screen Here.
      </Text>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb", 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#047857", 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280", 
    textAlign: "center",
  },
});
