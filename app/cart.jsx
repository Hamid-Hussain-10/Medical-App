import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

// Responsive helpers
const { width, height } = Dimensions.get("window");
const wp = (percent) => (width * percent) / 100;
const hp = (percent) => (height * percent) / 100;

export default function CartScreen() {
  const router = useRouter();

  const items = [
    {
      id: 1,
      title: "Male Hormones",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 1200,
      discount: 250,
      image: require("../assets/images/medical.jpg"),
    },
    {
      id: 2,
      title: "Vitamin D Test",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 1200,
      discount: 250,
      image: require("../assets/images/medical.jpg"),
    },
  ];

  const [cartItems, setCartItems] = useState(items);
  const [quantities, setQuantities] = useState(items.map(() => 1));
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => {
      const updated = [...prev];
      updated[index] = Math.max(1, updated[index] + value);
      return updated;
    });
  };

  const handleRemoveItem = (id, index) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setQuantities((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce(
    (acc, item, i) => acc + item.price * (quantities[i] || 1),
    0
  );
  const discount = cartItems.reduce((acc, item) => acc + item.discount, 0);
  const delivery = 411.4;
  const total = subtotal - discount + delivery;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor="#047857" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Icon name="chevron-back" size={wp(6)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <View style={{ width: wp(6) }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Pharmacy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Lab Tests</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Info */}
        <View style={styles.deliveryBox}>
          <Text style={styles.deliveryText}>
            DELIVER TO:{" "}
            <Text style={{ fontWeight: "600" }}>
              Dubai, United Arab Emirates
            </Text>
          </Text>
          <Icon name="chevron-forward" size={wp(5)} color="#333" />
        </View>

        {/* Cart Items */}
        <ScrollView
          style={{ flex: 1, paddingHorizontal: wp(4), marginTop: hp(1) }}
        >
          {cartItems.map((item, index) => (
            <View key={item.id} style={styles.cardRow}>
              <View style={styles.circle} />
              <View style={styles.card}>
                <View style={styles.imageBox}>
                  <Image source={item.image} style={styles.itemImage} />
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => handleRemoveItem(item.id, index)}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>
                      AED {item.price.toFixed(2)}
                    </Text>
                    <Text style={styles.strike}>AED {item.discount}</Text>
                  </View>
                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => handleQuantityChange(index, -1)}
                    >
                      <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{quantities[index]}</Text>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => handleQuantityChange(index, 1)}
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Payment Section */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Payment Method</Text>

          {/* Cash */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "cash" && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod("cash")}
          >
            <Icon name="cash" size={wp(5)} color="#333" />
            <Text style={styles.paymentText}>Cash on Delivery</Text>
            {paymentMethod === "cash" && (
              <View style={styles.radioActive}>
                <Icon name="checkmark" size={wp(3)} color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          {/* Card */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "card" && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod("card")}
          >
            <Icon name="card" size={wp(5)} color="#333" />
            <Text style={styles.paymentText}>Card</Text>
            {paymentMethod === "card" && (
              <View style={styles.radioActive}>
                <Icon name="checkmark" size={wp(3)} color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          {paymentMethod === "card" && (
            <View style={styles.cardInputs}>
              <TextInput placeholder="Card Number" style={styles.input} />
              <View style={styles.row}>
                <TextInput
                  placeholder="MM/YY"
                  style={[styles.input, { flex: 1, marginRight: wp(1.5) }]}
                />
                <TextInput
                  placeholder="CVV"
                  style={[styles.input, { flex: 1 }]}
                />
              </View>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.totalText}>AED {total.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => alert("Checkout pressed")}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#047857" },
  container: { flex: 1, backgroundColor: "#f9fafb" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#047857",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.5),
  },
  backBtn: { width: wp(6), alignItems: "flex-start" },
  headerTitle: { color: "#fff", fontSize: wp(5), fontWeight: "500" },

  tabs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingVertical: hp(1),
    marginLeft: wp(3),
  },
  activeTab: {
    backgroundColor: "#004540",
    paddingHorizontal: wp(5),
    paddingVertical: hp(0.8),
    borderRadius: wp(5),
    marginRight: wp(3),
  },
  activeTabText: { color: "#fff", fontWeight: "600", fontSize: wp(3.5) },
  inactiveTab: {
    borderWidth: 1,
    borderColor: "#047857",
    paddingHorizontal: wp(5),
    paddingVertical: hp(0.8),
    borderRadius: wp(5),
  },
  inactiveTabText: { color: "#004540", fontSize: wp(3.5) },

  deliveryBox: {
    backgroundColor: "#F1F5F9",
    padding: hp(1.5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deliveryText: { fontSize: wp(3.5), fontWeight: "500", flex: 1 },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1.5),
  },
  circle: {
    width: wp(3.5),
    height: wp(3.5),
    borderRadius: wp(1.75),
    borderWidth: 1,
    borderColor: "#047857",
    marginRight: wp(2),
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: wp(3),
    padding: wp(3),
    flex: 1,
    elevation: 4,
  },

  imageBox: { alignItems: "center", marginRight: wp(3) },
  itemImage: { width: wp(20), height: wp(20), borderRadius: wp(2) },
  removeBtn: { marginTop: hp(3), paddingHorizontal: wp(3) },
  removeText: { fontSize: wp(3.2), color: "#000" },

  itemTitle: { fontSize: wp(3.8), fontWeight: "600" },
  itemDesc: { fontSize: wp(3.2), color: "#666", marginTop: hp(0.3) },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(0.6),
  },
  price: {
    fontSize: wp(4),
    fontWeight: "700",
    color: "#000",
    marginRight: wp(2),
  },
  strike: {
    fontSize: wp(3.5),
    color: "#999",
    textDecorationLine: "line-through",
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(1),
    justifyContent: "flex-end",
  },
  qtyButton: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(1),
    borderWidth: 1,
    borderColor: "#047857",
    backgroundColor: "#047857",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { fontSize: wp(4), fontWeight: "500", color: "#fff" },
  qtyValue: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(0.5),
    fontSize: wp(4),
    fontWeight: "500",
    borderRadius: wp(1),
    borderWidth: 1,
    borderColor: "#eee",
    textAlign: "center",
    minWidth: wp(10),
  },

  paymentSection: {
    backgroundColor: "#fff",
    padding: wp(4),
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  paymentTitle: { fontSize: wp(4.5), fontWeight: "500", marginBottom: hp(1.2) },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(3),
    borderRadius: wp(3),
    marginBottom: hp(1),
  },
  paymentOptionActive: {
    borderColor: "#047857",
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
  },
  paymentText: { flex: 1, marginLeft: wp(2.5), fontSize: wp(3.5) },
  radioActive: {
    width: wp(4.5),
    height: wp(4.5),
    borderRadius: wp(2.25),
    backgroundColor: "#047857",
    justifyContent: "center",
    alignItems: "center",
  },

  cardInputs: { marginTop: hp(1) },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp(2),
    padding: wp(2.5),
    fontSize: wp(3.5),
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", marginTop: hp(0.8) },

  footer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: wp(4),
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  totalText: { fontSize: wp(4), fontWeight: "400" },
  checkoutBtn: {
    width: "70%",
    backgroundColor: "#047857",
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    borderRadius: wp(6),
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutText: { color: "#fff", fontSize: wp(3.8), fontWeight: "500" },
});
