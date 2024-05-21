import { Text, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function LeagueSelector() {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
        },
    });
    return (
        <View style={styles.container}>
            <IconButton icon="arrow-down-bold" size={32} />
            <Text variant="headlineMedium">Division X</Text>
            <IconButton icon="arrow-up-bold" size={32} />
        </View>
    );
}
