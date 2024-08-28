import React, { useState } from "react";
import { Text, useTheme, Button } from "react-native-paper";
import { View, StyleSheet, TextInput } from "react-native";

export default function LoginForm() {
    const theme = useTheme();
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const styles = StyleSheet.create({
        label: {
            color: theme.colors.onPrimary,
            textAlign: "center",
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
            backgroundColor: theme.colors.primaryContainer,
            color: theme.colors.onPrimaryContainer,
            width: 250,
        },
    });

    return (
        <>
            <View>
                <Text style={styles.label} variant="labelLarge">
                    Email
                </Text>
                <TextInput style={styles.input} />
            </View>
            <View>
                <Text style={styles.label} variant="labelLarge">
                    Password
                </Text>
                <TextInput style={styles.input} secureTextEntry={true} />
            </View>
            <Button style={styles.button}>Log In</Button>
        </>
    );
}
