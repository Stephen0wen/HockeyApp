import { ScrollView, StyleSheet } from "react-native";
import FixtureCard from "./FixtureCard";
import MatchdayContainer from "./MatchdayContainer";
import LoadScreen from "./LoadScreen";
import { useState, useEffect } from "react";
import { getResults } from "../ApiRequests";
import { Text } from "react-native-paper";

export default function ResultsPage() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getResults()
            .then((apiResults) => {
                setResults(apiResults);
            })
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <LoadScreen message="Loading Results..." />;
    }

    const matchDates = [];
    results.forEach((result) => {
        if (!matchDates.includes(result.match_date)) {
            matchDates.push(result.match_date);
        }
    });

    const matchdayContainers = matchDates.map((matchDate) => {
        const filteredFixtures = results.filter((result) => {
            return result.match_date === matchDate;
        });

        return (
            <MatchdayContainer date={new Date(matchDate).toLocaleDateString()}>
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
                Results
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
        gap: 5,
        padding: 5,
    },
    title: {
        textAlign: "center",
        margin: 5,
    },
});
