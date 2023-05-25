import { Text, View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

const Map = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 10.8772379,
    longitude: 106.8059272,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View>
      <MapView className="w-full h-full" region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      {/* <Button title="Get Location" onPress={userLocation}/> */}
    </View>
  );
};

export default Map;
