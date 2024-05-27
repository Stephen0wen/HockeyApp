import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useColorScheme } from "react-native";

export default function PlayerCard({ player }) {
    const colorScheme = useColorScheme();

    // let backgroundColor = "";
    // if (player.availability === "yes") {
    //     backgroundColor = colorScheme === "dark" ? "#050" : "#afa";
    // }
    // if (player.availability === "maybe") {
    //     backgroundColor = colorScheme === "dark" ? "#660" : "#ff9";
    // }
    // if (player.availability === "no") {
    //     backgroundColor = colorScheme === "dark" ? "#500" : "#fbb";
    // }

    const styles = StyleSheet.create({
        text: {
            textAlign: "center",
        },
        card: {
            width: 200,
            padding: 5,
            height: 30,
        },
    });

    return (
        <Card mode="contained" style={styles.card}>
            <Text style={styles.text}>{player.name} surname</Text>
        </Card>
    );
}
