import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

const CameraBasic = () => {
  let cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

// let takePic = async () => {
//   let option = {
//     quality: 1,
//     base64: true,
//     exif: false,
//   };
//   let newPhoto = await cameraRef.current.takePictureAsync(option);
// };

// return (
//   <Camera style={styles.container} ref={cameraRef}>
//     <View style={styles.buttonContainer}>
//       <Button title="Take Pic" onPress={takePic} />
//     </View>
//   </Camera>
// );
// }

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  camera: {
    // flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
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
});

export default CameraBasic;
