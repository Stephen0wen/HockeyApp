import { Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function SignUpForm({ setIsLoginForm }) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        label: {
            color: theme.colors.primary,
            textAlign: "center",
            alignContent: "flex-end",
            height: 20,
        },
        error: {
            color: theme.colors.error,
            textAlign: "center",
            width: 250,
            height: 40,
        },
        input: {
            width: 250,
            borderRadius: 50,
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingVertical: 5,
            margin: 5,
        },
        button: {
            backgroundColor: theme.colors.primary,
            width: 250,
            margin: 5,
        },

        outerText: {
            color: theme.colors.primary,
        },
        subtext: {
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
        },
        outerTextUnderlined: {
            color: theme.colors.primary,
            textAlign: "center",
            textDecorationLine: "underline",
            fontWeight: "bold",
        },
    });

    return (
        <>
            <Text variant="headlineSmall" style={styles.outerText}>
                Sign Up for Hockey App
            </Text>

            <View style={styles.subtext}>
                <Text variant="bodyLarge" style={styles.outerText}>
                    Already have an account?
                </Text>
                <Text
                    variant="bodyLarge"
                    style={styles.outerTextUnderlined}
                    onPress={() => {
                        setIsLoginForm(true);
                    }}
                >
                    Log In
                </Text>
            </View>
        </>
    );
}
