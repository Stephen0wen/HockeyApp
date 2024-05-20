import { StyleSheet, View } from "react-native";

import { Text, useTheme, Surface } from "react-native-paper";
import LoginButton from "./LoginButton";

export default function Header() {
    const theme = useTheme();

    const styles = StyleSheet.create({
        surface: {
            backgroundColor: theme.colors.primaryContainer,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            height: 80,
        },
        content: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "max-content",
            padding: 5,
        },
        text: {
            color: theme.colors.onPrimaryContainer,
        },
    });

    return (
        <Surface style={styles.surface} elevation={0}>
            <View style={styles.content}>
                <Text style={styles.text}>This is the Header</Text>
                <LoginButton />
            </View>
        </Surface>
    );
}
