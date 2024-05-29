import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MyFixtureContext } from "../../Contexts/MyFixtureContext";
import { getVenueByFixtureId } from "../../ApiRequests";
import { useState, useEffect, useContext } from "react";
import FixtureCard from "../FixtureCard";
import MatchdayContainer from "../MatchdayContainer";
import { Text } from "react-native-paper";

const VenueMap = () => {
    const { currentFixture } = useContext(MyFixtureContext);

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
                <Text variant="labelLarge">Pushback at {venue.pushback}</Text>
            </MatchdayContainer>
            <MapView
                style={styles.map}
                region={{
                    latitude: venue.venue_latitude ? venue.venue_latitude : 0,
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
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
        margin: 5,
    },
});

export default VenueMap;
