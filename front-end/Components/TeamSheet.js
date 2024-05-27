import { View, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { MyFixtureContext } from "../Contexts/MyFixtureContext";
import { Card, Text } from "react-native-paper";
import LoadScreen from "./LoadScreen";
import { getTeamSheet } from "../ApiRequests";
import PlayerCard from "./PlayerCard";
import { useColorScheme } from "react-native";

export default function TeamSheet() {
    const colorScheme = useColorScheme();

    const [isLoading, setIsLoading] = useState(false);
    const [teamsheet, setTeamSheet] = useState([
        { name: "Hanif", user_id: 1, availability: "yes" },
        { name: "Stephen", user_id: 2, availability: "yes" },
        { name: "Alec", user_id: 3, availability: "maybe" },
        { name: "Mior", user_id: 4, availability: "no" },
        { name: "Alfie", user_id: 5, availability: "no" },
    ]);

    const {
        user: { team_id },
    } = useContext(UserContext);

    const {
        currentFixture: { fixture_id },
    } = useContext(MyFixtureContext);

    // useEffect(() => {
    //     setIsLoading(true);
    //     getTeamSheet()
    //         .then((apiTeamsheet) => {
    //             setTeamSheet(apiTeamsheet);
    //         })
    //         .then(() => {
    //             setIsLoading(false);
    //         });
    // }, []);

    const styles = StyleSheet.create({
        teamsheet: {
            marginTop: 20,
            alignItems: "center",
            gap: 10,
        },
        yes: {
            backgroundColor: colorScheme === "dark" ? "#050" : "#afa",
        },
        maybe: {
            backgroundColor: colorScheme === "dark" ? "#660" : "#ff9",
        },
        no: {
            backgroundColor: colorScheme === "dark" ? "#500" : "#fbb",
        },
        container: {
            gap: 5,
            padding: 5,
        },
    });

    if (isLoading) {
        return <LoadScreen message="Loading Team Sheet..." />;
    }

    if (!isLoading) {
        return (
            <View style={styles.teamsheet}>
                <Text variant="headlineMedium">Team Sheet</Text>
                <Card
                    mode="contained"
                    style={styles.yes}
                    contentStyle={styles.container}
                >
                    <Text>Available:</Text>
                    {teamsheet
                        .filter((player) => {
                            return player.availability === "yes";
                        })
                        .map((player) => {
                            return (
                                <PlayerCard
                                    key={player.user_id}
                                    player={player}
                                />
                            );
                        })}
                </Card>
                <Card
                    mode="contained"
                    style={styles.maybe}
                    contentStyle={styles.container}
                >
                    <Text>Maybe Available:</Text>
                    {teamsheet
                        .filter((player) => {
                            return player.availability === "maybe";
                        })
                        .map((player) => {
                            return (
                                <PlayerCard
                                    key={player.user_id}
                                    player={player}
                                />
                            );
                        })}
                </Card>
                <Card
                    mode="contained"
                    style={styles.no}
                    contentStyle={styles.container}
                >
                    <Text>Not Available:</Text>
                    {teamsheet
                        .filter((player) => {
                            return player.availability === "no";
                        })
                        .map((player) => {
                            return (
                                <PlayerCard
                                    key={player.user_id}
                                    player={player}
                                />
                            );
                        })}
                </Card>
            </View>
        );
    }
}

// {
//     teamsheet.map((player) => {
//         return <PlayerCard key={player.user_id} player={player} />;
//     });
// }
