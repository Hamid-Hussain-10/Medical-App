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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

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

  // Totals calculation
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
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <View style={{ width: 24 }} />
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
          <Icon name="chevron-forward" size={20} color="#333" />
        </View>

        {/* Cart Items */}
        <ScrollView style={{ flex: 1, paddingHorizontal: 16, marginTop: 10 }}>
          {cartItems.map((item, index) => (
            <View key={item.id} style={styles.cardRow}>
              {/* Circle before card */}
              <View style={styles.circle} />

              {/* Card */}
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
                  {/* Quantity */}
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
            <Icon name="cash" size={20} color="#333" />
            <Text style={styles.paymentText}>Cash on Delivery</Text>
            {paymentMethod === "cash" && (
              <View style={styles.radioActive}>
                <Icon name="checkmark" size={12} color="#fff" />
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
            <Icon name="card" size={20} color="#333" />
            <Text style={styles.paymentText}>Card</Text>
            {paymentMethod === "card" && (
              <View style={styles.radioActive}>
                <Icon name="checkmark" size={12} color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          {paymentMethod === "card" && (
            <View style={styles.cardInputs}>
              <TextInput placeholder="Card Number" style={styles.input} />
              <View style={styles.row}>
                <TextInput
                  placeholder="MM/YY"
                  style={[styles.input, { flex: 1, marginRight: 6 }]}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#047857",
  },
  container: { flex: 1, backgroundColor: "#f9fafb" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#047857",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backBtn: { width: 24, alignItems: "flex-start" },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginLeft: 10,
  },
  activeTab: {
    backgroundColor: "#004540",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 15,
  },
  activeTabText: { color: "#fff", fontWeight: "600" },
  inactiveTab: {
    borderWidth: 1,
    borderColor: "#047857",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  inactiveTabText: { color: "#004540" },

  deliveryBox: {
    backgroundColor: "#F1F5F9",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deliveryText: { fontSize: 14, fontWeight: "500", flex: 1 },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#047857",
    marginRight: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flex: 1,
    elevation: 4,
  },

  imageBox: { alignItems: "center", marginRight: 12 },
  itemImage: { width: 80, height: 80, borderRadius: 10 },
  removeBtn: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  removeText: { fontSize: 14, color: "#000000", fontWeight: "400" },

  itemTitle: { fontSize: 14, fontWeight: "600", marginBottom: 2 },
  itemDesc: { fontSize: 12, color: "#666" },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 6,
  },
  price: { fontSize: 16, fontWeight: "700", color: "#000000", marginRight: 8 },
  strike: { fontSize: 14, color: "#999", textDecorationLine: "line-through" },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: "#047857",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { fontSize: 18, fontWeight: "600", color: "#ffffff" },
  qtyValue: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#eee",
    textAlign: "center",
    minWidth: 40,
  },

  paymentSection: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  paymentTitle: { fontSize: 18, fontWeight: "500", marginBottom: 12 },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  paymentOptionActive: {
    borderColor: "#047857",
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
  },
  paymentText: { flex: 1, marginLeft: 10, fontSize: 14, fontWeight: "400" },
  radioActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#047857",
    justifyContent: "center",
    alignItems: "center",
  },

  cardInputs: { marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", marginTop: 6 },

  footer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  totalText: { fontSize: 16, fontWeight: "500" },
  checkoutBtn: {
    width: "70%",
    backgroundColor: "#047857",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginBottom: 8,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});
