import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header with search and cart */}
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Icon name="search-outline" size={20} color="#666" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
        <TouchableOpacity style={styles.cartBtn}>
          <Icon name="cart-outline" size={24} color="#fff" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Location */}
      <View style={styles.locationBox}>
        <Text style={{ fontWeight: "500" }}>
          DELIVER TO: <Text style={{ fontWeight: "600" }}>Dubai, United Arab Emirates</Text>
        </Text>
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={{ color: "#fff", fontSize: 12 }}>Change</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <Image
          source={{ uri: "https://via.placeholder.com/350x150" }}
          style={styles.banner}
        />

        {/* Top Categories */}
        <Text style={styles.sectionTitle}>Top Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["Mother & Baby", "Beauty", "Nutrition", "Medical"].map((cat, i) => (
            <View key={i} style={styles.categoryCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/80" }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{cat}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Sale */}
        <Image
          source={{ uri: "https://via.placeholder.com/350x140" }}
          style={styles.saleBanner}
        />

        {/* Online Deals */}
        <Text style={styles.sectionTitle}>Online Exclusive Deals upto 60% Off</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((item) => (
            <Image
              key={item}
              source={{ uri: "https://via.placeholder.com/120x120" }}
              style={styles.dealCard}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    backgroundColor: "#047857",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchInput: { flex: 1, paddingHorizontal: 8 },
  cartBtn: { position: "relative" },
  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  locationBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  changeBtn: {
    backgroundColor: "#047857",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  banner: {
    width: "100%",
    height: 150,
    marginVertical: 10,
    borderRadius: 12,
    resizeMode: "cover",
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", margin: 12 },
  categoryCard: { alignItems: "center", marginHorizontal: 8 },
  categoryImage: { width: 70, height: 70, borderRadius: 10 },
  categoryText: { fontSize: 12, marginTop: 4 },
  saleBanner: {
    width: "100%",
    height: 140,
    marginVertical: 10,
    borderRadius: 12,
    resizeMode: "cover",
  },
  dealCard: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginHorizontal: 8,
  },
});
