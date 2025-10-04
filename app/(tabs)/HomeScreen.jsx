import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const banners = [
  require("../../assets/images/banner1.png"),
  require("../../assets/images/banner2.png"),
  require("../../assets/images/banner3.png"),
];

const categories = [
  { name: "Mother & Baby", img: require("../../assets/images/a.png") },
  { name: "Beauty", img: require("../../assets/images/b.png") },
  { name: "Nutrition", img: require("../../assets/images/c.png") },
  { name: "Medical", img: require("../../assets/images/d.png") },
  { name: "Wellness", img: require("../../assets/images/e.png") },
  { name: "Wellness", img: require("../../assets/images/f.png") },
];

const saleBanner = require("../../assets/images/sale.png");

const deals = [
  require("../../assets/images/deal.png"),
  require("../../assets/images/deal.png"),
  require("../../assets/images/deal.png"),
];

export default function HomeScreen() {
  const [activeBanner, setActiveBanner] = useState(0);
  const bannerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => {
        let nextIndex = (prev + 1) % banners.length;
        bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#047857" barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.header}>
          <View style={styles.searchBox}>
            <Icon name="search-outline" size={18} color="#666" />
            <TextInput placeholder="Search" style={styles.searchInput} />
          </View>
          <TouchableOpacity
            onPress={() => router.push("/cart")}
            style={styles.cartBtn}
          >
            <Icon name="cart" size={26} color="#fff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location */}
      <View style={styles.locationSection}>
        <View style={styles.locationBox}>
          <Text style={{ fontWeight: "500", fontSize: 14 }}>
            DELIVER TO:{" "}
            <Text style={{ fontWeight: "500", fontSize: 14 }}>
              Dubai, United Arab Emirates
            </Text>
          </Text>
          <TouchableOpacity style={styles.changeBtn}>
            <Text style={{ color: "#fff", fontSize: 12 }}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Slider */}
        <FlatList
          ref={bannerRef}
          data={banners}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveBanner(index);
          }}
          renderItem={({ item }) => (
            <Image source={item} style={styles.banner} />
          )}
        />

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {banners.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeBanner === i && styles.activeDot]}
            />
          ))}
        </View>

        {/* Categories */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Top Categories</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            renderItem={({ item }) => (
              <View style={styles.categoryCard}>
                <Image source={item.img} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        {/* Sale Banner */}
        <View style={styles.sectionBox}>
          <Image source={saleBanner} style={styles.saleBanner} />
        </View>

        {/* Deals */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>
            Online Exclusive Deals upto 60% Off
          </Text>
          <FlatList
            data={deals}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            renderItem={({ item }) => (
              <View style={styles.dealContainer}>
                <View style={styles.leftBadge}>
                  <Image
                    source={require("../../assets/images/path.png")}
                    style={styles.badgeBg}
                  />
                  <Text style={styles.discountText}>20% OFF</Text>
                </View>
                <View style={styles.rightIcon}>
                  <Icon name="heart-outline" size={18} color="#047857" />
                </View>
                <Image source={item} style={styles.dealCard} />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5faf9" },
  headerSection: { backgroundColor: "#047857", paddingTop: 35 },
  header: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 8,
    marginRight: 20,
    maxWidth: "75%",
  },
  searchInput: { flex: 1, paddingHorizontal: 8 },
  cartBtn: { position: "relative" },
  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "red",
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "600" },
  locationSection: { backgroundColor: "#ffffff", paddingBottom: 4 },
  locationBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  changeBtn: {
    backgroundColor: "#004B45",
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  banner: {
    width: width - 20,
    height: 170,
    borderRadius: 12,
    resizeMode: "cover",
    marginTop: 10,
    marginHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d1d5db",
    marginHorizontal: 4,
  },
  activeDot: { backgroundColor: "#047857", width: 8, height: 8 },
  sectionBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    backgroundColor: "#047857",
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    paddingVertical: 5,
    marginBottom: 6,
  },
  categoryCard: {
    width: 100,
    height: 100,
    marginHorizontal: 8,
    backgroundColor: "#cbd1cf",
    borderRadius: 6,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryImage: { width: 70, height: 70, borderRadius: 8 },
  categoryText: {
    width: "100%",
    fontSize: 11,
    color: "#fff",
    backgroundColor: "#047857",
    textAlign: "center",
    paddingVertical: 4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  saleBanner: {
    width: width - 20,
    height: 160,
    borderRadius: 12,
    resizeMode: "cover",
    marginHorizontal: 10,
  },
  dealContainer: {
    width: 140,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
    justifyContent: "center",
  },
  dealCard: { width: "70%", height: "70%", resizeMode: "cover", top: 20 },
  leftBadge: { position: "absolute", top: 4, left: 4, alignItems: "center" },
  badgeBg: { width: 40, height: 40, resizeMode: "contain" },
  discountText: {
    position: "absolute",
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  rightIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#f3f2f2",
    borderRadius: 20,
    padding: 4,
  },
});
