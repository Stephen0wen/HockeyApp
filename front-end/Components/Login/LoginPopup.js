import { Modal, Portal, Text, useTheme } from "react-native-paper";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { View, StyleSheet } from "react-native";

export default function LoginPopup({ visible, setVisible }) {
    const hideModal = () => setVisible(false);

    const theme = useTheme();

    const { user, setUser, setUserRole } = useContext(UserContext);

    const styles = StyleSheet.create({
        modal: {
            alignSelf: "center",
            backgroundColor: theme.colors.primary,
            height: 450,
            maxHeight: "90%",
            borderRadius: 10,
            marginHorizontal: 20,
        },
        scroll: {
            width: "100%",
            height: "90%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
        },
        outerText: {
            color: theme.colors.onPrimary,
            textAlign: "center",
        },
        subtext: {
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
        },
        outerTextUnderlined: {
            color: theme.colors.onPrimary,
            textAlign: "center",
            textDecorationLine: "underline",
            fontWeight: "bold",
        },
    });

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.modal}
                animationType="slide"
            >
                <View style={styles.scroll}>
                    <Text variant="headlineSmall" style={styles.outerText}>
                        Sign In to Hockey App
                    </Text>
                </View>
                <View style={styles.subtext}>
                    <Text variant="bodyLarge" style={styles.outerText}>
                        Don't have an account?
                    </Text>
                    <Text
                        variant="bodyLarge"
                        style={styles.outerTextUnderlined}
                    >
                        Sign Up
                    </Text>
                </View>
            </Modal>
        </Portal>
    );
}
