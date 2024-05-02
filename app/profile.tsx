import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <View style={styles.profilePhoto}></View>
      <View style={styles.profileInformation}></View>
      <View style={styles.validate}></View>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
  },
  profilePhoto: {
    // backgroundColor: "red",
    flex: 3,
  },
  profileInformation: {
    // backgroundColor: "green",
    flex: 3,
  },
  validate: {
    // backgroundColor: "yellow",
    flex: 1,
  },
});
