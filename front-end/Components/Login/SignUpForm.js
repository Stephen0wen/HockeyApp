import { Text, useTheme, Button } from "react-native-paper";
import { View, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";

export default function SignUpForm({ setIsLoginForm }) {
    const theme = useTheme();
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword1, setInputPassword1] = useState("");
    const [inputPassword2, setInputPassword2] = useState("");
    const [error, setError] = useState(" ");

    const styles = StyleSheet.create({
        form: {
            marginVertical: 10,
        },
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

    useEffect(() => {}, [inputEmail]);

    return (
        <>
            <Text variant="headlineSmall" style={styles.outerText}>
                Sign Up for Hockey App
            </Text>
            <View style={styles.form}>
                <View>
                    <Text style={styles.label} variant="labelLarge">
                        Email
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={inputEmail}
                        onChangeText={setInputEmail}
                    />
                    <Text style={styles.error} variant="labelLarge">
                        {error}
                    </Text>
                </View>
                <View>
                    <Text style={styles.label} variant="labelLarge">
                        Password
                    </Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={inputPassword1}
                        onChangeText={setInputPassword1}
                    />
                    <Text style={styles.error} variant="labelLarge">
                        {error}
                    </Text>
                </View>
                <View>
                    <Text style={styles.label} variant="labelLarge">
                        Repeat Password
                    </Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={inputPassword2}
                        onChangeText={setInputPassword2}
                    />
                    <Text style={styles.error} variant="labelLarge">
                        {error}
                    </Text>
                </View>
                <View>
                    <Text style={styles.label} variant="labelLarge">
                        {" "}
                    </Text>
                    <Button
                        style={styles.button}
                        textColor={theme.colors.onPrimary}
                        onPress={() => {
                            console.log("next");
                        }}
                    >
                        Next
                    </Button>
                </View>
            </View>
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
