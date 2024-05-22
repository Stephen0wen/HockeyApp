import { StyleSheet, View } from "react-native";
import { Switch, Text } from "react-native-paper";

export default function UserViewSwitch({ label }) {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginVertical: 10,
        },
    });

    return (
        <View style={styles.container}>
            <Text>{label}</Text>
            <Switch />
        </View>
    );
}
