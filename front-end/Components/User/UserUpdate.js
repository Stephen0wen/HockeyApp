import { Button, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function UserUpdate() {
    const theme = useTheme();

    const styles = StyleSheet.create({
        button: {
            width: 150,
            height: 40,
            margin: 10,
        },
    });
    return (
        <Button
            mode="elevated"
            compact="true"
            style={styles.button}
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
        >
            Update My Details
        </Button>
    );
}
