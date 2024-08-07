import "react-native-gesture-handler";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Categories from "@/Components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Restaurants from "@/Components/Restaurants";
import Colors from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Page = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <Categories />
          <Text style={styles.header}>Top picks in your neighbourhood</Text>
          <Restaurants />
          <Text style={styles.header}>Offer near you</Text>
          <Restaurants />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});

export default Page;
