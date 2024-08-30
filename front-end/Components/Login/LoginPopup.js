import { Modal, Portal, Text, useTheme } from "react-native-paper";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { View, StyleSheet } from "react-native";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function LoginPopup({ visible, setVisible }) {
    const hideModal = () => setVisible(false);
    const theme = useTheme();
    const { user, setUser, setUserRole } = useContext(UserContext);
    const [isLoginForm, setIsLoginForm] = useState(true);

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
                    {isLoginForm ? (
                        <LoginForm setIsLoginForm={setIsLoginForm} />
                    ) : (
                        <SignUpForm setIsLoginForm={setIsLoginForm} />
                    )}
                </View>
            </Modal>
        </Portal>
    );
}
