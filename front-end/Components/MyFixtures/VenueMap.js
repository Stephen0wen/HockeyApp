import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MyFixtureContext } from "../../Contexts/MyFixtureContext";
import { getVenueByFixtureId } from "../../ApiRequests";
import { useState, useEffect, useContext } from "react";
import { useColorScheme } from "react-native";

const VenueMap = () => {
  const {
    currentFixture: { fixture_id },
  } = useContext(MyFixtureContext);

  const [region, setRegion] = useState({
    latitude: 52.6386,
    longitude: -1.1355,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [venue, setVenue] = useState({});
  console.log(fixture_id);
  useEffect(() => {
    getVenueByFixtureId(fixture_id)
      .then((venue) => {
        setVenue(venue);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Map</Text>
      <>
        {/* <Text style={styles.teamNames}>
          {venue.home_team} vs {venue.away_team}
        </Text> */}
        {/* <Text style={styles.teamNames}>
          Pushback at {venue.team_start_time}
        </Text> */}
        <MapView
          style={styles.map}
          region={{
            latitude: venue.venue_latitude,
            longitude: venue.venue_longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: venue.venue_latitude,
              longitude: venue.venue_longitude,
            }}
            title={venue.venue_name}
          />
        </MapView>
      </>
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