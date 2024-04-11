import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import useBasketStore from "@/basketStore";
import Colors from "@/constants/Colors";

const Basket = () => {
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const [order, serOrder] = useState(false);

  const FEES = {
    sevice: 2.99,
    delivery: 5.99,
  };

  return (
    <>
      {order && <Text>cool order</Text>}
      {!order && (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={<Text style={styles.section}>Items</Text>}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.gery }} />
            )}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={{ color: Colors.primary, fontSize: 18 }}>
                  {item.quantity}x
                </Text>
                <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                <Text style={{ fontSize: 18 }}>
                  ${item.price * item.quantity}
                </Text>
              </View>
            )}
            ListFooterComponent={
              <View>
                <View
                  style={{ height: 1, backgroundColor: Colors.gery }}
                ></View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Subtotal</Text>
                  <Text style={{ fontSize: 18 }}>${total}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Service</Text>
                  <Text style={{ fontSize: 18 }}>${FEES.sevice}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Delivery fee</Text>
                  <Text style={{ fontSize: 18 }}>${FEES.delivery}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Order Total</Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    ${(total + FEES.sevice + FEES.delivery).toFixed(2)}
                  </Text>
                </View>
              </View>
            }
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 18,
    color: Colors.medium,
  },
});

export default Basket;
