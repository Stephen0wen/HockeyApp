import React from "react";
import { Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function LoginForm() {
    const theme = useTheme();

    const styles = StyleSheet.create({
        form: {
            backgroundColor: theme.colors.primaryContainer,
        },
    });

    return (
        <View style={styles.form}>
            <Text>Login Form</Text>
        </View>
    );
}
