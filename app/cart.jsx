import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CartScreen() {
  const [quantities, setQuantities] = useState([1, 1]);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => {
      const updated = [...prev];
      updated[index] = Math.max(1, updated[index] + value);
      return updated;
    });
  };

  const subtotal = quantities.reduce((acc, q) => acc + q * 1200, 0);
  const discount = 250 * quantities.length; // mock discount
  const total = subtotal - discount + 411.4; // delivery/fees

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
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
          DELIVER TO: <Text style={{ fontWeight: "600" }}>Dubai, United Arab Emirates</Text>
        </Text>
      </View>

      {/* Cart Items */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 16, marginTop: 10 }}>
        {[0, 1].map((index) => (
          <View key={index} style={styles.card}>
            <Image
              source={{ uri: "https://via.placeholder.com/80" }}
              style={styles.itemImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>Male Hormones</Text>
              <Text style={styles.itemDesc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>AED 1200.00</Text>
                <Text style={styles.strike}>AED 250</Text>
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
          <Icon name="cash-outline" size={20} color="#333" />
          <Text style={styles.paymentText}>Cash on Delivery</Text>
          {paymentMethod === "cash" && <View style={styles.radioActive} />}
        </TouchableOpacity>

        {/* Card */}
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === "card" && styles.paymentOptionActive,
          ]}
          onPress={() => setPaymentMethod("card")}
        >
          <Icon name="card-outline" size={20} color="#333" />
          <Text style={styles.paymentText}>Card</Text>
          {paymentMethod === "card" && <View style={styles.radioActive} />}
        </TouchableOpacity>

        {paymentMethod === "card" && (
          <View style={styles.cardInputs}>
            <TextInput placeholder="Card Number" style={styles.input} />
            <View style={styles.row}>
              <TextInput placeholder="MM/YY" style={[styles.input, { flex: 1, marginRight: 6 }]} />
              <TextInput placeholder="CVV" style={[styles.input, { flex: 1 }]} />
            </View>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>AED {total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#047857",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600", marginLeft: 10 },

  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: "#047857",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTabText: { color: "#fff", fontWeight: "600" },
  inactiveTab: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  inactiveTabText: { color: "#444" },

  deliveryBox: { backgroundColor: "#fff", padding: 14, borderBottomWidth: 1, borderColor: "#eee" },
  deliveryText: { fontSize: 13, fontWeight: "500" },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
  },
  itemImage: { width: 70, height: 70, borderRadius: 10, marginRight: 12 },
  itemTitle: { fontSize: 14, fontWeight: "600", marginBottom: 2 },
  itemDesc: { fontSize: 12, color: "#666" },
  priceRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  price: { fontSize: 15, fontWeight: "700", color: "#047857", marginRight: 8 },
  strike: { fontSize: 13, color: "#999", textDecorationLine: "line-through" },
  quantityRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { fontSize: 18, fontWeight: "600" },
  qtyValue: { marginHorizontal: 10, fontSize: 15, fontWeight: "600" },

  paymentSection: { backgroundColor: "#fff", padding: 16, borderTopWidth: 1, borderColor: "#eee" },
  paymentTitle: { fontSize: 15, fontWeight: "700", marginBottom: 12 },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginBottom: 10,
  },
  paymentOptionActive: { borderColor: "#047857", backgroundColor: "#ecfdf5" },
  paymentText: { flex: 1, marginLeft: 10, fontSize: 14, fontWeight: "500" },
  radioActive: { width: 14, height: 14, borderRadius: 7, backgroundColor: "#047857" },

  cardInputs: { marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", marginTop: 8 },

  footer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  totalText: { fontSize: 18, fontWeight: "700" },
  checkoutBtn: {
    backgroundColor: "#047857",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  checkoutText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});
