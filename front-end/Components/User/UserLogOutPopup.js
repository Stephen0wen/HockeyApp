import { Modal, Text, useTheme, Button, Divider } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function UserLogOutPopup({
    visibleUserLogOff,
    toggleModalUserLogOff,
    user,
    setUser,
    setUserRole,
}) {
    const theme = useTheme();

    const [visibleUserLogOffSuccess, setVisibleUserLogOffSuccess] =
        useState(false);
    const toggleModalUserLogOffSuccess = () =>
        setVisibleUserLogOffSuccess(!visibleUserLogOffSuccess);

    const handleUserLogOffYes = () => {
        toggleModalUserLogOff();
        toggleModalUserLogOffSuccess();
    };

    const styles = StyleSheet.create({
        modal: {
            alignSelf: "center",
            backgroundColor: theme.colors.primaryContainer,
            borderRadius: 10,
            marginHorizontal: 20,
            alignItems: "center",
            padding: 10,
        },
        button: {
            width: 100,
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "center",
            padding: 10,
            gap: 10,
        },
        container: {
            gap: 15,
            alignItems: "center",
            width: 240,
        },
    });

    return (
        <>
            <Modal
                visible={visibleUserLogOff}
                onDismiss={toggleModalUserLogOff}
                contentContainerStyle={styles.modal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text>Are you sure you want to log out?</Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="elevated"
                            onPress={handleUserLogOffYes}
                            buttonColor={theme.colors.primary}
                            textColor={theme.colors.onPrimary}
                            style={styles.button}
                        >
                            Yes
                        </Button>
                        <Button
                            mode="elevated"
                            onPress={toggleModalUserLogOff}
                            buttonColor={theme.colors.primary}
                            textColor={theme.colors.onPrimary}
                            style={styles.button}
                        >
                            No
                        </Button>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={visibleUserLogOffSuccess}
                onDismiss={() => {
                    toggleModalUserLogOffSuccess;
                    setUser(null);
                    setUserRole("public");
                }}
                contentContainerStyle={styles.modal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text>You have logged off.</Text>
                    <Button
                        mode="elevated"
                        onPress={() => {
                            toggleModalUserLogOffSuccess;
                            setUser(null);
                            setUserRole("public");
                        }}
                        buttonColor={theme.colors.primary}
                        textColor={theme.colors.onPrimary}
                        style={styles.button}
                    >
                        OK
                    </Button>
                </View>
            </Modal>
        </>
    );
}
