import { ScrollView, StyleSheet, View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";
import FixtureCard from "./FixtureCard";
import { useState } from "react";

export default function ResultsPage() {
    const [value, setValue] = useState("");

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
        },
        container: {
            marginTop: 10,
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
        },
        button: {
            flex: 2,
            margin: 0,
            paddingH: 0,
            lineHeight: 20,
            fontSize: 20,
            width: 100,
        },
        details: {
            flex: 1,
            marginHorizontal: 10,
        },
    });

    const fixtureUI = (
        <View style={styles.container}>
            <Text variant="labelMedium" style={styles.details}>
                Details
            </Text>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                style={styles.button}
                density="high"
                buttons={[
                    {
                        value: "yes",
                        label: "Yes",
                    },
                    {
                        value: "maybe",
                        label: "IDK",
                    },
                    { value: "no", label: "No" },
                ]}
            />
        </View>
    );

    return (
        <ScrollView contentStyle={styles.scroll}>
            <FixtureCard fixture={futureFixture}>{fixtureUI}</FixtureCard>
            <FixtureCard fixture={futureFixture}>{fixtureUI}</FixtureCard>
            <FixtureCard fixture={futureFixture}>{fixtureUI}</FixtureCard>
            <FixtureCard fixture={futureFixture} />
            <FixtureCard fixture={pastFixture} />
        </ScrollView>
    );
}
