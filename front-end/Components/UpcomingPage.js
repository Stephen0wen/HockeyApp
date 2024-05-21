import { ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import FixtureCard from "./FixtureCard";
import MatchdayContainer from "./MatchdayContainer";

export default function UpcomingPage() {
    const futureFixture = {
        fixture_id: 1,
        match_status: "planned",
        team1_id: 1,
        team1_name: "Leicester Wolves",
        team2_id: 2,
        team2_name: "Old Bags",
        venue_id: 3,
        venue_name: "Alfie Fenables Centre",
        match_date: "11/5/24",
        start_time: 13.0,
        division: "Division 1",
    };

    const futureFixture2 = {
        fixture_id: 1,
        match_status: "planned",
        team1_id: 1,
        team1_name: "Leicester Wolves",
        team2_id: 2,
        team2_name: "Old Bags",
        venue_id: 3,
        venue_name: "Alfie Fenables Centre",
        match_date: "15/5/24",
        start_time: 13.0,
        division: "Division 1",
    };

    const styles = StyleSheet.create({
        scroll: {
            flex: 1,
            alignItems: "center",
        },
    });

    return (
        <ScrollView contentStyle={styles.scroll}>
            <MatchdayContainer date={futureFixture.match_date}>
                <FixtureCard fixture={futureFixture} />
                <FixtureCard fixture={futureFixture} />
                <FixtureCard fixture={futureFixture} />
            </MatchdayContainer>
            <MatchdayContainer date={futureFixture2.match_date}>
                <FixtureCard fixture={futureFixture2} />
                <FixtureCard fixture={futureFixture2} />
            </MatchdayContainer>
        </ScrollView>
    );
}
