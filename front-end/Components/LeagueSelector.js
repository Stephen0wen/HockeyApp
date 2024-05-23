import { Text, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function LeagueSelector({
    leagueTables,
    displayedLeague,
    setDisplayedLeague,
}) {
    const handlePressUp = () => {
        const leagueOptions = Object.keys(leagueTables);
        let leagueIndex = leagueOptions.indexOf(displayedLeague);
        leagueIndex === leagueOptions.length - 1
            ? (leagueIndex = 0)
            : leagueIndex++;

        setDisplayedLeague(leagueOptions[leagueIndex]);
    };

    const handlePressDown = () => {
        const leagueOptions = Object.keys(leagueTables);
        let leagueIndex = leagueOptions.indexOf(displayedLeague);

        leagueIndex === 0
            ? (leagueIndex = leagueOptions.length - 1)
            : leagueIndex--;

        setDisplayedLeague(leagueOptions[leagueIndex]);
    };

    return (
        <View style={styles.container}>
            <IconButton
                icon="arrow-down-bold"
                size={32}
                onPress={handlePressDown}
            />
            <Text variant="headlineMedium">Division {displayedLeague}</Text>
            <IconButton
                icon="arrow-up-bold"
                size={32}
                onPress={handlePressUp}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
});
