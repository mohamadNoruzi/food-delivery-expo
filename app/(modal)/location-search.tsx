import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import TextToLocation from "@/Components/TextToLocation";
import Mapbox, {
  Camera,
  LocationPuck,
  MapView,
  UserTrackingMode,
} from "@rnmapbox/maps";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PK || "");

const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 35.68877029418945,
    longitude: 51.41503143310547,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  console.log("location", location);

  const updateLocation = (
    newLocation: React.SetStateAction<{
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    }>
  ) => {
    setLocation(newLocation);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextToLocation updateLocation={updateLocation} location={location} />
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        styles={{
          container: {
            flex: 1,
          },
          textInput: {
            fontSize: 18,
          },
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        onFail={(error) => console.log("error" + error)}
        listViewDisplayed={true}
        fetchDetails
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
      /> */}
      {/* <MapView showsUserLocation={true} style={styles.map} region={location} /> */}
      <MapView
        style={styles.map}
        styleURL="mapbox://styles/mapbox/outdoors-v12"
      >
        <Camera
          // followUserLocation
          // followZoomLevel={10}
          zoomLevel={10}
          centerCoordinate={[location.longitude, location.latitude]}
          followUserLocation={false}
          followUserMode={UserTrackingMode.Follow}
          followZoomLevel={14}
        />
        <LocationPuck />
      </MapView>
      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 15,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
