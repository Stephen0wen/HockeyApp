//install MapView from react-native-maps
//https://youtu.be/su5v_Gg9Sxk?si=GDSgHHFhrUeqdIif
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Button } from "react-native";
import { venues } from "../data/venues";

export default function MapScreen() {
  const initialVenue = venues.find((venue) => venue.venue_id === 1);

  const [mapRegion, setMapRegion] = useState({
    latitude: initialVenue.venue_latitude,
    longitude: initialVenue.venue_longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedVenue, setSelectedVenue] = useState(initialVenue);
  const [markerTitle, setMarkerTitle] = useState("");
  const [isMapRegionUpdating, setIsMapRegionUpdating] = useState(false);

  const getMarkerTitleForRegion = (mapRegion) => {
    return selectedVenue.venue_name;
  };

  const handleRegionChangeComplete = (mapRegion) => {
    setIsMapRegionUpdating(false);
    setMarkerTitle(getMarkerTitleForRegion());
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.centeredText, { fontSize: 40, fontWeight: "bold" }]}>
        Fixture goes here
      </Text>
      <Text style={[styles.centeredText, { fontSize: 20, fontWeight: "bold" }]}>
        {selectedVenue.venue_name}
      </Text>
      <Text style={[styles.centeredText, { fontSize: 20, fontWeight: "bold" }]}>
        {selectedVenue.venue_address_1} | {selectedVenue.venue_postcode}
      </Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={mapRegion}
          onRegionChangeComplete={handleRegionChangeComplete}
        >
          {!isMapRegionUpdating && selectedVenue && (
            <Marker
              coordinate={{
                latitude: selectedVenue.venue_latitude,
                longitude: selectedVenue.venue_longitude,
              }}
              title={markerTitle}
            />
          )}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredText: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  mapContainer: {
    height: "50%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
