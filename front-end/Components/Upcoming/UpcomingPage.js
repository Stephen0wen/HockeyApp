import { ScrollView, StyleSheet } from "react-native";
import FixtureCard from "../FixtureCard";
import MatchdayContainer from "../MatchdayContainer";
import LoadScreen from "../LoadScreen";
import { useState, useEffect } from "react";
import { getUpcomingFixtures } from "../../ApiRequests";
import { Text } from "react-native-paper";

export default function UpcomingPage() {
    const [upcomingFixtures, setUpcomingFixtures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        return <LoadScreen message="Loading Results..." />;
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
                        />
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
});
