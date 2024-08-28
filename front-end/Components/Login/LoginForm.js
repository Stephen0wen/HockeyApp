import React, { useState } from "react";
import { Text, useTheme, Button } from "react-native-paper";
import { View, StyleSheet, TextInput } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
    const auth = getAuth();
    const theme = useTheme();
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [error, setError] = useState(" ");

    const signIn = () => {
        if (inputEmail === "" || inputPassword === "") {
            setError("The username or password you entered is incorrect");
            return;
        }

        signInWithEmailAndPassword(auth, inputEmail, inputPassword)
            .then((prop) => {
                setError(" ");
                console.log(prop.user.accessToken);
                // This JWT needs to be sent to BE to get user details
            })
            .catch(() => {
                setError("The username or password you entered is incorrect");
            });
    };

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
    });

    return (
        <>
            <View>
                <Text style={styles.label} variant="labelLarge">
                    Email
                </Text>
                <TextInput
                    style={styles.input}
                    value={inputEmail}
                    onChangeText={setInputEmail}
                />
            </View>
            <View>
                <Text style={styles.label} variant="labelLarge">
                    Password
                </Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={inputPassword}
                    onChangeText={setInputPassword}
                />
            </View>
            <View>
                <Text style={styles.error} variant="labelLarge">
                    {error}
                </Text>
                <Button
                    style={styles.button}
                    textColor={theme.colors.onPrimary}
                    onPress={signIn}
                >
                    Log In
                </Button>
            </View>
        </>
    );
}
