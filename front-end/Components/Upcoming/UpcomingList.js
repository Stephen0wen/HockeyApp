import { ScrollView, StyleSheet } from "react-native";
import FixtureCard from "../FixtureCard";
import MatchdayContainer from "../MatchdayContainer";
import LoadScreen from "../LoadScreen";
import { useState, useEffect, useContext } from "react";
import { getUpcomingFixtures } from "../../ApiRequests";
import { Text, Button } from "react-native-paper";
import { MyFixtureContext } from "../../Contexts/MyFixtureContext";
import FilterFixtures from "../Filter/FilterFixtures";

export default function UpcomingList({ navigation }) {
    const [upcomingFixtures, setUpcomingFixtures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setCurrentFixture } = useContext(MyFixtureContext);

    useEffect(() => {
        setIsLoading(true);
        getUpcomingFixtures()
            .then((apiUpcomingFixtures) => {
                setUpcomingFixtures(apiUpcomingFixtures);
            })
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <LoadScreen message="Loading Upcoming Fixtures..." />;
    }

    const matchDates = [];
    upcomingFixtures.forEach((upcomingFixture) => {
        if (!matchDates.includes(upcomingFixture.match_date)) {
            matchDates.push(upcomingFixture.match_date);
        }
    });

    const matchdayContainers = matchDates.map((matchDate) => {
        const filteredFixtures = upcomingFixtures.filter((upcomingFixture) => {
            return upcomingFixture.match_date === matchDate;
        });

        return (
            <MatchdayContainer
                key={matchDate}
                date={new Date(matchDate).toLocaleDateString()}
            >
                {filteredFixtures.map((filteredFixture) => {
                    return (
                        <FixtureCard
                            key={filteredFixture.fixture_id}
                            fixture={filteredFixture}
                        >
                            <Button
                                style={styles.button}
                                onPress={() => {
                                    setCurrentFixture(filteredFixture);
                                    navigation.navigate("Details");
                                }}
                            >
                                View Details
                            </Button>
                        </FixtureCard>
                    );
                })}
            </MatchdayContainer>
        );
    });

    return (
        <>
            <Text variant="headlineMedium" style={styles.title}>
                Upcoming Fixtures
            </Text>
            <ScrollView contentStyle={styles.scroll}>
                {matchdayContainers}
            </ScrollView>
            <FilterFixtures
                setFixtures={setUpcomingFixtures}
                matchStatus="upcoming"
            />
        </>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        textAlign: "center",
        margin: 5,
    },
    button: {
        margin: -5,
    },
});
