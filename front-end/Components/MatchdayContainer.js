import { Surface, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function MatchdayContainer({ children, date }) {
    const styles = StyleSheet.create({
        surface: {
            margin: 5,
            alignItems: "center",
            padding: 5,
            borderRadius: 15,
            gap: 5,
        },
    });

    return (
        <Surface style={styles.surface}>
            <Text>{date}</Text>
            {children}
        </Surface>
    );
}
