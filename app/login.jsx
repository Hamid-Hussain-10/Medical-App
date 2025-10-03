import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#047857" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Curved White Container */}
      <View style={styles.h2container}>
        <View style={styles.header2}>
          <Image
            source={require("../assets/images/Shifara logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.inputWrapper}>
          <Icon name="mail" size={20} color="#047857" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666"
            defaultValue="Johnsmith@Gmail.Com"
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push("./HomeScreen")}
          style={styles.continueBtn}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR LOGIN WITH</Text>
          <View style={styles.line} />
        </View>

        {/* Google Btn */}
        <TouchableOpacity style={styles.googleBtn}>
          <Image
            source={require("../assets/images/google.png")}
            style={styles.googleIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#047857",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backBtn: { width: 24, alignItems: "flex-start" },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  h2container: { backgroundColor: "#047857" },
  header2: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 100,
    paddingVertical: 30,
  },
  content: { flex: 1, alignItems: "center", paddingTop: 10 },
  logo: { width: 200, height: 50, marginBottom: 20 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#047857",
    borderRadius: 12,
    paddingHorizontal: 12,
    width: "85%",
    height: 50,
    marginBottom: 30,
    backgroundColor: "#fff",
  },
  input: { flex: 1, marginLeft: 10, fontSize: 15, color: "#6b6a6a" },
  continueBtn: {
    width: "85%",
    backgroundColor: "#047857",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  continueText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "85%",
  },
  line: { flex: 1, height: 1, backgroundColor: "#ccc" },
  orText: { marginHorizontal: 8, fontSize: 14, color: "#777", fontWeight: "500" },
  googleBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  googleIcon: { width: 30, height: 30 },
});
