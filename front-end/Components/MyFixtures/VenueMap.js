import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
// import { MyFixtureContext } from "../../Contexts/MyFixtureContext";
import { getVenueByFixtureId } from "../../ApiRequests";
import { useState, useEffect, useContext } from "react";
import { useColorScheme } from "react-native";

const VenueMap = ({ fixture_id }) => {
  const [venue, setVenue] = useState(null);

  console.log(fixture_id);
  useEffect(() => {
    getVenueByFixtureId(fixture_id)
      .then((venue) => {
        setVenue(venue);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fixture_id]);

  return (
    <View style={styles.container}>
      {venue ? ( // Check if venue has a valid value
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: venue.venue_lat,
            longitude: venue.venue_long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: venue.venue_lat,
              longitude: venue.venue_long,
            }}
            title={venue.venue_name}
          />
        </MapView>
      ) : (
        // Render a loading indicator or a placeholder view
        <View>
          <Text>Loading venue...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  teamNames: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  map: {
    flex: 1,
  },
});

export default VenueMap;
