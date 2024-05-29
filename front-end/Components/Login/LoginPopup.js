import {
    Modal,
    Portal,
    Text,
    useTheme,
    Button,
    Divider,
    TextInput,
} from "react-native-paper";
import React from "react";
import { useState, useContext } from "react";
import SignUp from "./SignUp";
import { getUsers } from "../Utils/getUsers";
import { UserContext } from "../../Contexts/UserContext";
import LoginSuccess from "./LoginSuccess";
import LoginError from "./LoginError";
import { StyleSheet, View } from "react-native";

export default function LoginPopup({ visible, setVisible }) {
    const hideModal = () => setVisible(false);
    const [text, onChangeText] = React.useState();
    const [text2, onChangeText2] = React.useState();

    const theme = useTheme();

    const [visibleSignUp, setVisibleSignUp] = useState(false);
    const showModalSignUp = () => setVisibleSignUp(!visibleSignUp);

    const [visibleLogInSuccess, setVisibleLogInSuccess] = useState(false);
    const toggleModalLogIn = () => setVisibleLogInSuccess(!visibleLogInSuccess);

    const [visibleLogInError, setVisibleLogInError] = useState(false);
    const toggleModalLogInError = () =>
        setVisibleLogInError(!visibleLogInError);

    const [loginErrorMsg, setLoginErrorMsg] = useState("");

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const { user, setUser, setUserRole } = useContext(UserContext);

    const handleLogIn = () => {
        getUsers().then((users) => {
            const correctUser = users.find(
                (user) => user.user_email === username
            );
            setPassword();
            if (!correctUser) {
                setLoginErrorMsg("User not found!");
                toggleModalLogInError();
            } else if (correctUser.user_password !== password) {
                toggleModalLogInError();
                setLoginErrorMsg("Incorrect password!");
            } else {
                setUser({ ...correctUser });
                setUserRole("player");
                setVisible(!visible);
                toggleModalLogIn();
            }
        });
    };

    const styles = StyleSheet.create({
        modal: {
            backgroundColor: theme.colors.primaryContainer,
            padding: 20,
            maxWidth: 500,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            gap: 50,
        },
        form: {
            gap: 15,
            alignItems: "center",
            width: "100%",
        },
        field: {
            width: "100%",
            alignItems: "center",
        },
        input: {
            height: 35,
            width: "100%",
        },
        button: {
            width: 100,
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
                <Text variant="headlineMedium">Log In to Hockey App</Text>
                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text> Email: </Text>
                        <TextInput
                            onChangeText={setUsername}
                            value={username}
                            mode="outlined"
                            multiline={false}
                            placeholder="address@domain.com"
                            textAlign="center"
                            style={styles.input}
                        ></TextInput>
                    </View>
                    <View style={styles.field}>
                        <Text> Password: </Text>
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            mode="outlined"
                            multiline={false}
                            secureTextEntry={true}
                            textAlign="default"
                            style={styles.input}
                        />
                    </View>
                    <Button
                        mode="elevated"
                        style={styles.button}
                        onPress={() => handleLogIn()}
                    >
                        Submit
                    </Button>
                </View>
                <View />
                <View style={styles.form}>
                    <Text> Don't have an account? </Text>
                    <Button
                        mode="elevated"
                        style={styles.button}
                        onPress={() => setVisibleSignUp(!visibleSignUp)}
                    >
                        Sign Up
                    </Button>
                </View>
            </Modal>
            <LoginSuccess
                visibleLogInSuccess={visibleLogInSuccess}
                toggleModalLogIn={toggleModalLogIn}
            />
            <LoginError
                visibleLogInError={visibleLogInError}
                toggleModalLogInError={toggleModalLogInError}
                loginErrorMsg={loginErrorMsg}
            />
            <SignUp
                visibleSignUp={visibleSignUp}
                setVisibleSignUp={setVisibleSignUp}
            />
        </Portal>
    );
}
