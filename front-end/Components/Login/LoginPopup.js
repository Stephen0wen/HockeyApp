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
import { useState } from "react";
import SignUp from "./SignUp";
export default function LoginPopup({ visible, setVisible }) {
    const hideModal = () => setVisible(false);
    const [text, onChangeText] = React.useState();
    const [text2, onChangeText2] = React.useState();

    const theme = useTheme();

    const [visibleSignUp, setVisibleSignUp] = useState(false);
    const showModalSignUp = () => setVisibleSignUp(!visibleSignUp);

    const containerStyle = {
        backgroundColor: theme.colors.primaryContainer,
        padding: 20,
        width: "auto",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10%",
        marginRight: "10%",
        display: "flex",
    };

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
                animationType="slide"
            >
                <Text marginBottom={"5%"} variant="headlineLarge">
                    Login{" "}
                </Text>
                <Text> Name: </Text>
                <TextInput
                    onChangeText={onChangeText}
                    value={text}
                    mode="outlined"
                    multiline={false}
                    placeholder="enter name here"
                    textAlign="default"
                    style={{ minWidth: "20000" }}
                ></TextInput>
                <Text marginTop={"5%"}> Password: </Text>
                <TextInput
                    onChangeText={onChangeText2}
                    value={text2}
                    mode="outlined"
                    multiline={false}
                    placeholder="enter password"
                    secureTextEntry={true}
                    textAlign="default"
                ></TextInput>
                <Text />
                <Button
                    width="100%"
                    marginBottom={"5%"}
                    mode="outlined"
                    onPress={() => (
                        setVisible(!visible), console.log(text, text2)
                    )}
                >
                    <Divider />
                    <Text>Submit </Text>
                </Button>
                <Button
                    width="100%"
                    marginBottom={"5%"}
                    mode="outlined"
                    onPress={() => setVisible(!visible)}
                >
                    <Divider />
                    <Text>Continue Without Logging In </Text>
                </Button>

                <Text> Don't have an account? </Text>
                <Text />
                <Button
                    width="40%"
                    marginBottom={"5%"}
                    mode="outlined"
                    // onPress={() => setVisible(!visible)}
                    onPress={() => setVisibleSignUp(!visibleSignUp)}
                >
                    <SignUp
                        visibleSignUp={visibleSignUp}
                        setVisibleSignUp={setVisibleSignUp}
                    />
                    <Divider />
                    <Text>Sign up </Text>
                </Button>
            </Modal>
        </Portal>
    );
}
