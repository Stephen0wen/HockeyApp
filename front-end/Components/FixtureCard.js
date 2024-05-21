import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function FixtureCard() {
    const fixture = {
        fixture_id: 1,
        match_status: "complete",
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

    const styles = StyleSheet.create({
        card: {
            margin: 5,
        },
        cardContent: {
            width: "100%",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            justifyContent: "space-evenly",
        },
        scoreContainer: {
            flexDirection: "row",
            justifyContent: "center",
        },
        scoreText: {
            textAlign: "center",
            padding: 2,
        },
        teamName: {
            width: "30%",
            textAlign: "center",
            margin: 5,
        },
    });

    let scoreDisplay = <></>;

    if (fixture.match_status === "completed") {
        scoreDisplay = (
            <>
                <Text variant="headlineLarge" style={styles.scoreText}>
                    {fixture.team1_score}
                </Text>
                <Text variant="headlineMedium" style={styles.scoreText}>
                    :
                </Text>
                <Text variant="headlineLarge" style={styles.scoreText}>
                    {fixture.team2_score}
                </Text>
            </>
        );
    } else {
        scoreDisplay = <Text variant="headlineMedium">VS</Text>;
    }

    return (
        <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
                <Text variant="titleSmall" style={styles.teamName}>
                    {fixture.team1_name}
                </Text>
                <View style={styles.scoreContainer}>{scoreDisplay}</View>
                <Text variant="titleSmall" style={styles.teamName}>
                    {fixture.team2_name}
                </Text>
            </Card.Content>
        </Card>
    );
}
