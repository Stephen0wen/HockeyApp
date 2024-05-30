import { Modal, Text, useTheme, Button, Divider } from "react-native-paper";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SuccessfulUserPatch({
    visiblePatchSuccess,
    toggleModalSuccess,
    message,
    toggleVisibleTeam,
}) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        modal: {
            alignSelf: "center",
            backgroundColor: theme.colors.primaryContainer,
            maxWidth: 500,
            maxHeight: "90%",
            borderRadius: 10,

            alignItems: "center",
            paddingHorizontal: 20,
        },
        form: {
            gap: 0,
            alignItems: "center",
            width: "100%",
            marginVertical: 20,
            gap: 10,
        },
        button: {
            width: 100,
        },
    });

    return (
        <Modal
            visible={visiblePatchSuccess}
            onDismiss={toggleModalSuccess}
            contentContainerStyle={styles.modal}
            animationType="slide"
        >
            <View style={styles.form}>
                <Text>{message}</Text>

                <Button
                    buttonColor={theme.colors.primary}
                    textColor={theme.colors.onPrimary}
                    style={styles.button}
                    onPress={() => {
                        toggleModalSuccess(), toggleVisibleTeam();
                    }}
                >
                    Dismiss
                </Button>
            </View>
        </Modal>
    );
}
