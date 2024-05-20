import { StyleSheet } from "react-native";

import { Text, useTheme, Surface } from "react-native-paper";
import LoginButton from "./LoginButton";

export default function Header() {
    const theme = useTheme();

    const styles = StyleSheet.create({
        surface: {
            backgroundColor: theme.colors.primaryContainer,
            alignItems: "center",
            justifyContent: "center",
            height: 80,
        },
        text: {
            color: theme.colors.onPrimaryContainer,
        },
    });

    return (
        <Surface style={styles.surface} elevation={0}>
            <Text style={styles.text}>This is the Header</Text>
            <LoginButton />
        </Surface>
    );
}
