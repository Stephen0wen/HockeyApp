import { Modal, Text, useTheme, Button, Divider } from "react-native-paper";
import React from "react";
import { StyleSheet } from "react-native";

export default function LoginError({
    visibleLogInError,
    toggleModalLogInError,
    loginErrorMsg,
}) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        containerStyle: {
            alignSelf: "center",
            backgroundColor: theme.colors.errorContainer,
            alignItems: "center",
            justifyContent: "center",
            width: 200,
            gap: 15,
            padding: 20,
            borderRadius: 10,
            marginHorizontal: 40,
        },
    });

    return (
        <Modal
            visible={visibleLogInError}
            onDismiss={toggleModalLogInError}
            contentContainerStyle={styles.containerStyle}
            animationType="slide"
        >
            <Text variant="bodyLarge">{loginErrorMsg}</Text>
            <Button
                mode="elevated"
                buttonColor={theme.colors.error}
                onPress={toggleModalLogInError}
                textColor={theme.colors.onError}
            >
                Dismiss
            </Button>
        </Modal>
    );
}
