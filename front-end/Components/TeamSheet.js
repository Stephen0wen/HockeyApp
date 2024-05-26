import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function TeamSheet({ teamsheet }) {
    return (
        <View style={styles.teamsheet}>
            <Text variant="headlineMedium">Team Sheet</Text>
            <Text>Person</Text>
            <Text>Person</Text>
            <Text>Person</Text>
            <Text>Person</Text>
            <Text>Person</Text>
            <Text>Person</Text>
            <Text>Person</Text>
            <Text>Person</Text>
            <Text>Person</Text>
            <Text>Person</Text>
            <Text>Person</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    teamsheet: {
        marginTop: 20,
        alignItems: "center",
        gap: 5,
    },
});
