import { Modal, Portal, Text, useTheme } from "react-native-paper";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { View, StyleSheet } from "react-native";
import LoginForm from "./LoginForm";

export default function LoginPopup({ visible, setVisible }) {
    const hideModal = () => setVisible(false);

    const theme = useTheme();

    const { user, setUser, setUserRole } = useContext(UserContext);

    const styles = StyleSheet.create({
        modal: {
            alignSelf: "center",
            backgroundColor: theme.colors.primaryContainer,
            height: 450,
            maxHeight: "90%",
            borderRadius: 10,
        },
        scroll: {
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
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
                    <LoginForm />
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
                </View>
            </Modal>
        </Portal>
    );
}
