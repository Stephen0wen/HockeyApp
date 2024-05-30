import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MyFixtureContext } from "../../Contexts/MyFixtureContext";
import { getVenueByFixtureId } from "../../ApiRequests";
import { useState, useEffect, useContext } from "react";
import FixtureCard from "../FixtureCard";
import MatchdayContainer from "../MatchdayContainer";
import { Text, Button } from "react-native-paper";

const VenueMap = ({ navigation }) => {
    const { currentFixture, setCurrentFixture } = useContext(MyFixtureContext);

    const [region, setRegion] = useState({
        latitude: 52.6386,
        longitude: -1.1355,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [venue, setVenue] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    useEffect(() => {
        getVenueByFixtureId(currentFixture.fixture_id)
            .then((venue) => {
                setVenue(venue);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentFixture]);

    return (
        <>
            <MatchdayContainer
                date={new Date(currentFixture.match_date).toLocaleDateString()}
            >
                <FixtureCard fixture={currentFixture} />
                <Text variant="labelLarge">
                    Pushback at {currentFixture.start_time}
                </Text>
            </MatchdayContainer>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: venue.venue_latitude
                            ? venue.venue_latitude
                            : 0,
                        longitude: venue.venue_longitude
                            ? venue.venue_longitude
                            : 0,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: venue.venue_latitude
                                ? venue.venue_latitude
                                : 0,
                            longitude: venue.venue_longitude
                                ? venue.venue_longitude
                                : 0,
                        }}
                        title={venue.venue_name}
                    />
                </MapView>
            </View>
            <Text style={styles.address} variant="headlineSmall">
                {venue.venue_name}
            </Text>
            <Button
                onPress={() => {
                    navigation.goBack();
                    setCurrentFixture({});
                }}
            >
                Back
            </Button>
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,
        borderRadius: 10,
        overflow: "hidden",
        margin: 5,
    },
    address: {
        textAlign: "center",
    },
});

export default VenueMap;
