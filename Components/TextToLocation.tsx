import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import useMapApi from "@/hook/useMapHook";
import Colors from "@/constants/Colors";

const TextToLocation = ({ updateLocation, location }: any) => {
  const [search, setSearch] = useState("");
  const { data, loading, error } = useMapApi(search);

  useEffect(() => {
    if (
      data?.locations[0]?.referencePosition &&
      search != (null || "") &&
      search.trim().length >= 3
    ) {
      const pos = data.locations[0].referencePosition;
      updateLocation({
        ...location,
        latitude: pos.latitude,
        longitude: pos.longitude,
      });
    }
  }, [data]);

  return (
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
            placeholder="Search"
            onChangeText={(newText) => setSearch(newText)}
          />
        </View>
      </View>
    </View>
  );
};

export default TextToLocation;

const styles = StyleSheet.create({
  searchContainer: {
    height: 55,
    backgroundColor: "#fff",
  },
  searchSection: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 5,
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
    width: "100%",
  },
});
