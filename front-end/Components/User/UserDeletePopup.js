import { Modal, Text, useTheme, Button } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { deleteUserById } from "../../ApiRequests";

export function UserDeletePopup({
    visibleUserDelete,
    toggleModalUserDelete,
    user,
    setUser,
    setUserRole,
}) {
    const theme = useTheme();

    const [visibleUserDeleteSuccess, setVisibleUserDeleteSuccess] =
        useState(false);
    const toggleModalUserDeleteSuccess = () =>
        setVisibleUserDeleteSuccess(!visibleUserDeleteSuccess);

    const [visibleUserDeleteFail, setVisibleUserDeleteFail] = useState(false);
    const toggleModalUserDeleteFail = () =>
        setVisibleUserDeleteFail(!visibleUserDeleteFail);

    const handleUserDeleteYes = () => {
        deleteUserById(user.user_id)
            .then(() => {
                toggleModalUserDeleteSuccess();
                toggleModalUserDelete();
            })
            .catch((error) => {
                toggleModalUserDeleteFail();
                toggleModalUserDelete();
            });
    };

    const styles = StyleSheet.create({
        modal: {
            alignSelf: "center",
            backgroundColor: theme.colors.errorContainer,
            borderRadius: 10,
            marginHorizontal: 20,
            alignItems: "center",
            padding: 10,
        },
        confirmModal: {
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
                visible={visibleUserDelete}
                onDismiss={toggleModalUserDelete}
                contentContainerStyle={styles.modal}
                animationType="slide"
            >
                <Text>WARNING</Text>
                <Text>Are you sure you want to delete your account?</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="elevated"
                        onPress={handleUserDeleteYes}
                        buttonColor={theme.colors.error}
                        textColor={theme.colors.onError}
                        style={styles.button}
                    >
                        Yes
                    </Button>
                    <Button
                        mode="elevated"
                        onPress={toggleModalUserDelete}
                        buttonColor={theme.colors.error}
                        textColor={theme.colors.onError}
                        style={styles.button}
                    >
                        No
                    </Button>
                </View>
            </Modal>
            <Modal
                visible={visibleUserDeleteSuccess}
                onDismiss={() => {
                    toggleModalUserDeleteSuccess();
                    setUser(null);
                    setUserRole("public");
                }}
                contentContainerStyle={styles.confirmModal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text>Your account has been deleted</Text>
                    <Button
                        mode="elevated"
                        onPress={() => {
                            toggleModalUserDeleteSuccess();
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
