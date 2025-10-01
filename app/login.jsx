import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn}>
        <Icon name="chevron-back" size={24} color="#047857" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Image
          source={{ uri: "https://via.placeholder.com/150x50?text=Shifara" }}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <Icon name="mail-outline" size={20} color="#666" />
          <TextInput
            placeholder="Email"
            defaultValue="Johnsmith@Gmail.Com"
            style={styles.input}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR LOGIN WITH</Text>
          <View style={styles.line} />
        </View>

        {/* Google Login */}
        <TouchableOpacity style={styles.googleBtn}>
          <Image
            source={{
              uri: "https://img.icons8.com/color/48/000000/google-logo.png",
            }}
            style={styles.googleIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 16 },
  backBtn: { marginTop: 10 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: 140, height: 50, marginBottom: 40 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "90%",
    height: 50,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  input: { flex: 1, marginLeft: 10 },
  continueBtn: {
    width: "90%",
    backgroundColor: "#047857",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  continueText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "90%",
  },
  line: { flex: 1, height: 1, backgroundColor: "#ccc" },
  orText: { marginHorizontal: 8, fontSize: 12, color: "#777" },
  googleBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  googleIcon: { width: 30, height: 30 },
});
