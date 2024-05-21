import { ScrollView, StyleSheet, View } from "react-native";
import FixtureCard from "./FixtureCard";
import MyFixtureUI from "./MyFixtureUI";

export default function ResultsPage() {
    const pastFixture = {
        fixture_id: 1,
        match_status: "completed",
        team1_id: 1,
        team1_name: "Leicester Wolves",
        team2_id: 2,
        team2_name: "Old Bags",
        team1_score: 20,
        team2_score: 10,
        venue_id: 3,
        venue_name: "Alfie Fenables Centre",
        match_date: "11/5/24",
        start_time: 13.0,
        division: "Division 1",
    };

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

    const styles = StyleSheet.create({
        scroll: {
            flex: 1,
            alignItems: "center",
            gap: 5,
            padding: 5,
        },

        details: {
            flex: 1,
            marginHorizontal: 10,
        },
    });

    return (
        <ScrollView contentStyle={styles.scroll}>
            <FixtureCard fixture={futureFixture}>
                <MyFixtureUI />
            </FixtureCard>
            <FixtureCard fixture={futureFixture}>
                <MyFixtureUI />
            </FixtureCard>
            <FixtureCard fixture={futureFixture}>
                <MyFixtureUI />
            </FixtureCard>
            <FixtureCard fixture={futureFixture} />
            <FixtureCard fixture={pastFixture} />
        </ScrollView>
    );
}
