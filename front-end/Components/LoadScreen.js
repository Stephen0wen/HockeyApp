import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export default function LoadScreen({ message }) {
    return (
        <View style={styles.container}>
            <Text>{message}</Text>
            <ActivityIndicator />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 10,
        margin: 5,
    },
});
