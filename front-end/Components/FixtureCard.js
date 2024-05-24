import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function FixtureCard({ children, fixture }) {
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
        <>
            <Card mode="contained" style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    <View style={styles.fixtureContainer}>
                        <Text variant="titleSmall" style={styles.teamName}>
                            {fixture.team1_name}
                        </Text>
                        <View style={styles.scoreNumbers}>{scoreDisplay}</View>
                        <Text variant="titleSmall" style={styles.teamName}>
                            {fixture.team2_name}
                        </Text>
                    </View>
                    <View>{children}</View>
                </Card.Content>
            </Card>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        maxWidth: 500,
        width: "100%",
    },
    cardContent: {
        width: "100%",
        justifyContent: "space-between",
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    fixtureContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: 10,
    },
    scoreNumbers: {
        flexDirection: "row",
        justifyContent: "center",
    },
    scoreText: {
        textAlign: "center",
        padding: 2,
    },
    teamName: {
        width: "35%",
        textAlign: "center",
        margin: 5,
    },
});
