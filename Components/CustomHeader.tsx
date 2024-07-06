import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

import Colors from "@/constants/Colors";
import BottomSheet from "./BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useBasketStore from "@/basketStore";
import useProfileStore from "@/profilePhotoStore";

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <View style={styles.searchSection}>
      <View style={styles.searchField}>
        <Ionicons
          style={styles.searchIcon}
          name="search-outline"
          size={20}
          color={Colors.medium}
        />
        <TextInput
          style={styles.input}
          placeholder="Restaurants, groceries, dishes"
        />
      </View>
      <Link href={"/(modal)/filter"} asChild>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

const CustomHeader = () => {
  const { items } = useBasketStore();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openModal = () => {
    bottomSheetRef.current?.present();
  };
  const { imgURI } = useProfileStore();

  return (
    <SafeAreaView style={styles.SafeArea}>
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
          <Image
            style={styles.bike}
            source={require("@/assets/images/bike.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
          <Text style={styles.title}>Deilvery . Now</Text>
          <View style={styles.locationName}>
            <Text style={styles.subtitle}>London</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <View style={styles.profileButton}>
          <Link href="/basket" asChild>
            <TouchableOpacity>
              <Ionicons
                name="cart-outline"
                size={20}
                color={Colors.primary}
                style={styles.profileButtonIcons}
              />
              {items > 0 && (
                <View style={styles.CartBadge}>
                  <Text>{items}</Text>
                </View>
              )}
            </TouchableOpacity>
          </Link>
          <Link href="/profile" asChild>
            <TouchableOpacity style={styles.tochableImageProfile}>
              {imgURI ? (
                <Image
                  source={{ uri: imgURI }}
                  style={styles.profileButtonImage}
                />
              ) : (
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={Colors.primary}
                  style={styles.profileButtonIcons}
                />
              )}
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  bike: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
  },
  profileButton: {
    flexDirection: "row",
    gap: 20,
  },
  profileButtonIcons: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50,
  },
  tochableImageProfile: {
    borderRadius: 20,
    width: 40,
    height: 40,
    overflow: "hidden",
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  profileButtonImage: {
    width: 40,
    height: 40,
  },
  CartBadge: {
    position: "absolute",
    left: 22,
    backgroundColor: "red",
    paddingHorizontal: 5,
    borderRadius: 50,
  },
  locationName: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    color: Colors.medium,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    height: 60,
    backgroundColor: "#fff",
  },
  searchSection: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    paddingLeft: 4,
  },
  input: {
    padding: 10,
    color: Colors.mediumDark,
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
});

export default CustomHeader;
