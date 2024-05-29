import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function PlayerCard({ player }) {
    return (
        <Card mode="contained" style={styles.card}>
            <Text style={styles.text}>{player.name} surname</Text>
        </Card>
    );
}

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
