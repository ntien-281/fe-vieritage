import { Text, View, Button, StyleSheet } from "react-native";
import MapView, { Marker, Callout, Circle } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
  
const Map = () => {
  //Get Distance 2 points on map
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const [mapRegion, setMapRegion] = useState({
    latitude: 10.8699573,
    longitude: 106.8028159,
    latitudeDelta: 0.1534,
    longitudeDelta: 0.1861,
  });

  const markers = [
    {
      title: "Event 1",
      latitude: 10.9432,
      longitude: 106.83185,
    },
    {
      title: "Event 2",
      latitude: 10.876541,
      longitude: 106.721825,
    },
    {
      title: "Event 3",
      latitude: 10.986549,
      longitude: 106.75181,
    },
  ];

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // setErrorMsg("Permission to access location was denied");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setMapRegion({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.1534,
    // longitudeDelta: 0.1861,
    });
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        autoFocus={true}
        listViewDisplayed="auto"
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
        minLength={2}
        returnKeyType={"search"}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
//           var place = autocomplete.getPlace();
// // get lat
// var lat = place.geometry.location.lat();
// // get lng
// var lng = place.geometry.location.lng();
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        styles={{
          container: {
            flex: 0,
            alignSelf: "center",
            marginTop: 10,
            position: "absolute",
            width: "96%",
            zIndex: 1,
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          },
          textInput: {
            height: 50,
            color: "#5d5d5d",
            fontSize: 18,
          },
        }}
      />
      <MapView style={styles.map} region={mapRegion} provider="google">
        {markers
          .filter(
            (marker) =>
              getDistanceFromLatLonInKm(
                mapRegion.latitude,
                mapRegion.longitude,
                marker.latitude,
                marker.longitude
              ) < 10
          )
          .map((marker) => (
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              key={marker.title}
              pinColor={"#474744"}
            >
              {/* <Callout>
              <Text>{marker.title}</Text>
            </Callout> */}
            </Marker>
          ))}

        <Marker coordinate={mapRegion} title="Trường ĐH Công nghệ Thông tin">
          {/* <Callout> */}
          {/* <Text>Trường ĐH Công nghệ Thông tin</Text> */}
          {/* </Callout> */}
        </Marker>
        <Circle
          center={{
            // latitude: 10.8699573,
            // longitude: 106.8028159,
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
          }}
          radius={10000}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
export default Map;
