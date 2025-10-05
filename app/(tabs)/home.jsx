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
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

// Dynamic scaling helpers
const wp = (percent) => (width * percent) / 100;
const hp = (percent) => (height * percent) / 100;

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
            <Icon name="search-outline" size={14} color="#666" />
            <TextInput placeholder="Search" style={styles.searchInput} />
          </View>
          <TouchableOpacity
            onPress={() => router.push("/cart")}
            style={styles.cartBtn}
          >
            <Icon name="cart" size={wp(6.5)} color="#fff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location */}
      <View style={styles.locationSection}>
        <View style={styles.locationBox}>
          <Text style={{ fontWeight: "500", fontSize: wp(3.5) }}>
            DELIVER TO:{" "}
            <Text style={{ fontWeight: "500", fontSize: wp(3.5) }}>
              Dubai, United Arab Emirates
            </Text>
          </Text>
          <TouchableOpacity style={styles.changeBtn}>
            <Text style={{ color: "#fff", fontSize: wp(3) }}>Change</Text>
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
            contentContainerStyle={{ paddingHorizontal: wp(2) }}
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
            contentContainerStyle={{ paddingHorizontal: wp(2) }}
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
                  <Icon name="heart-outline" size={wp(4)} color="#047857" />
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
  headerSection: {
    backgroundColor: "#047857",
    paddingTop: Platform.OS === "ios" ? hp(5) : hp(4),
  },
  header: {
    flexDirection: "row",
    padding: wp(3),
    alignItems: "center",
    justifyContent: "flex-end",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: wp(3),
    marginRight: wp(5),
    maxWidth: "75%",
    maxHeight: "95%",
  },
  searchInput: { flex: 1, paddingHorizontal: wp(1) },
  cartBtn: { position: "relative", marginRight: 5 },
  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "red",
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeText: { color: "#fff", fontSize: wp(2.5), fontWeight: "600" },
  locationSection: { backgroundColor: "#F1F5F9", paddingBottom: hp(0.5) },
  locationBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: hp(1),
  },
  changeBtn: {
    backgroundColor: "#004B45",
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(3),
    borderRadius: 12,
  },
  banner: {
    width: wp(96),
    height: hp(22),
    borderRadius: 12,
    resizeMode: "cover",
    marginTop: hp(1),
    marginHorizontal: wp(2),
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp(0.5),
  },
  dot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: "#d1d5db",
    marginHorizontal: wp(1),
  },
  activeDot: { backgroundColor: "#047857" },
  sectionBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: hp(1),
    paddingVertical: hp(1),
  },
  sectionTitle: {
    fontSize: wp(4.5),
    backgroundColor: "#047857",
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    paddingVertical: hp(0.8),
    marginBottom: hp(0.8),
  },
  categoryCard: {
    width: wp(25),
    height: wp(25),
    marginHorizontal: wp(2),
    backgroundColor: "#cbd1cf",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryImage: { width: wp(18), height: wp(18), borderRadius: 8 },
  categoryText: {
    width: "100%",
    fontSize: wp(2.8),
    color: "#fff",
    backgroundColor: "#047857",
    textAlign: "center",
    paddingVertical: hp(0.5),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  saleBanner: {
    width: wp(96),
    height: hp(20),
    borderRadius: 12,
    resizeMode: "cover",
    marginHorizontal: wp(2),
  },
  dealContainer: {
    width: wp(35),
    height: hp(20),
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: wp(2),
    marginBottom: hp(1),
    padding: wp(2),
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
    justifyContent: "center",
  },
  dealCard: { width: "70%", height: "70%", resizeMode: "cover", top: hp(2) },
  leftBadge: { position: "absolute", top: 4, left: 4, alignItems: "center" },
  badgeBg: { width: wp(10), height: wp(10), resizeMode: "contain" },
  discountText: {
    position: "absolute",
    color: "#fff",
    fontSize: wp(3),
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
