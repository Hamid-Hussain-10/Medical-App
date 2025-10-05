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
  Dimensions,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");
const wp = (percent) => (width * percent) / 100;
const hp = (percent) => (height * percent) / 100;

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#047857" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="chevron-back" size={wp(6)} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
        <View style={{ width: wp(6) }} />
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
          <Icon name="mail" size={wp(5)} color="#047857" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666"
            defaultValue="Johnsmith@Gmail.Com"
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/home")}
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

        {/* Google Button */}
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
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === "ios" ? hp(7) : hp(6),
    paddingBottom: hp(2),
  },
  backBtn: { width: wp(6), alignItems: "flex-start" },
  headerTitle: {
    color: "#fff",
    fontSize: RFValue(17),
    fontWeight: "500",
    textAlign: "center",
  },

  h2container: { backgroundColor: "#047857" },
  header2: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: wp(25),
    paddingVertical: hp(4),
  },
  logo: { width: wp(50), height: hp(6), marginBottom: hp(1) },

  content: { flex: 1, alignItems: "center", paddingTop: hp(2) },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#047857",
    borderRadius: wp(3),
    paddingHorizontal: wp(3),
    width: "85%",
    height: hp(6),
    marginBottom: hp(4.5),
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginLeft: wp(2),
    fontSize: RFValue(14),
    color: "#6b6a6a",
  },

  continueBtn: {
    width: "85%",
    backgroundColor: "#047857",
    paddingVertical: hp(1.1),
    borderRadius: wp(6),
    alignItems: "center",
    marginBottom: hp(2.5),
  },
  continueText: { color: "#fff", fontWeight: "500", fontSize: RFValue(15) },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(2.5),
    width: "85%",
  },
  line: { flex: 1, height: 1, backgroundColor: "#ccc" },
  orText: {
    marginHorizontal: wp(2),
    fontSize: RFValue(12),
    color: "#777",
    fontWeight: "500",
  },

  googleBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp(2),
    padding: hp(1.2),
    backgroundColor: "#fff",
  },
  googleIcon: { width: wp(8), height: wp(8) },
});
