import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import useProfileStore from "@/profilePhotoStore";
import { useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const CameraBasic = () => {
  const navigation = useNavigation();
  const cameraRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { addPhoto } = useProfileStore();
  const [preview, setPreview] = useState(String);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTintColor: Colors.primary,
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#000",
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.roundBatton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ),
    });
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      let option = {
        quality: 1,
        base64: true,
        exif: false,
      };
      let newPhoto = await cameraRef.current.takePictureAsync(option);
      setPreview(newPhoto.uri);
    }
  };

  const confirmPreview = () => {
    addPhoto(preview);
    setPreview("");
    navigation.goBack();
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.PermissionContainer}>
        <Text style={{ paddingBottom: 40, fontSize: 15, fontWeight: "bold" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (preview) {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Image source={{ uri: preview }} style={styles.Image} />
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.buttonPreview}
            onPress={confirmPreview}
          >
            <Text style={styles.text}>It's Fine👌</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    top: 91,
    // left: 0,
    flex: 1,
    backgroundColor: "black",
  },
  PermissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    marginTop: 30,
    height: (4 * Dimensions.get("window").width) / 3,
    width: Dimensions.get("window").width,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 10,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  roundBatton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    flex: 10,
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  buttonPreview: {
    alignSelf: "center",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 15,
  },
});

export default CameraBasic;
