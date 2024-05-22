import { StyleSheet, View } from "react-native";

import { Text, useTheme, Surface } from "react-native-paper";
import LoginButton from "./LoginButton";
import Logo from "./Logo";

export default function Header() {
    const theme = useTheme();

    const styles = StyleSheet.create({
        surface: {
            backgroundColor: theme.colors.primary,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            height: 75,
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
            color: theme.colors.onPrimary,
        },
    });

    return (
        <Surface style={styles.surface} elevation={0}>
            <View style={styles.content}>
                <Logo />
                <LoginButton />
            </View>
        </Surface>
    );
}
