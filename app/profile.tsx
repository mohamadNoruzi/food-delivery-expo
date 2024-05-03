import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import useProfileStore from "@/profilePhotoStore";

const profile = () => {
  const { addPhoto, removePhoto, imgURI } = useProfileStore();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      addPhoto(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileLogo}>
          {imgURI ? (
            <Image source={{ uri: imgURI }} style={styles.image} />
          ) : (
            <Ionicons name="person-outline" size={150} color={Colors.primary} />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            removePhoto();
          }}
        >
          <Ionicons name="trash-outline" size={30} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.GalleryPiker}>
          <Text style={styles.buttonText}>Add Profile Photo Form Gallary</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInformation}></View>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
  },
  profileSection: {
    // backgroundColor: "red",
    flex: 3,
    justifyContent: "space-around",
    alignItems: "center",
  },
  profileInformation: {
    // backgroundColor: "green",
    flex: 4,
  },
  image: {
    width: 200,
    height: 200,
  },
  profileLogo: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 100,
    overflow: "hidden",
  },
  GalleryPiker: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
