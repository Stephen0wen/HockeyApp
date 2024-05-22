import { Text, Surface, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import UserViewSwitch from "./UserViewSwitch";

export default function UserView() {
    const theme = useTheme();

    const styles = StyleSheet.create({
        surface: {
            width: 150,
            margin: 10,
            borderRadius: 20,
        },
        text: {
            color: theme.colors.primary,
            textAlign: "center",
        },
    });
    return (
        <Surface style={styles.surface}>
            <Text variant="titleMedium" style={styles.text}>
                View As
            </Text>
            <UserViewSwitch label="public" />
            <UserViewSwitch label="player" />
            <UserViewSwitch label="super" />
        </Surface>
    );
}
