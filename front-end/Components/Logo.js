import { Text, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function Logo() {
    const theme = useTheme();

    const styles = StyleSheet.create({
        logo: {
            color: theme.colors.onPrimary,
            fontSize: 30,
            fontFamily: "Jaro",
        },
    });

    return <Text style={styles.logo}>Hockey App</Text>;
}
