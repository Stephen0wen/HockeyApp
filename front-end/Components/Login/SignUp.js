import {
    Modal,
    Portal,
    Text,
    useTheme,
    Button,
    TextInput,
} from "react-native-paper";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { signUpForm } from "../Utils/signUpForm";
import IncorrectWarning from "../Utils/IncorrectWarning";
import { getTeams } from "../Utils/teamFetcher";
import DropDownPicker from "react-native-dropdown-picker";
import { postUser } from "../Utils/postUser";

export default function SignUp({ visibleSignUp, setVisibleSignUp }) {
    const hideModal = () => setVisibleSignUp(false);
    const hideSuccess = () => setSuccessPopUp(false);
    const theme = useTheme();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [auth, setAuth] = useState({
        name: false,
        email: false,
        password: false,
        password2: false,
        check: false,
        team: false,
    });
    const [successPopUp, setSuccessPopUp] = useState(false);
    const [user, setUser] = useState([]);

    const styles = StyleSheet.create({
        modal: {
            alignSelf: "center",
            backgroundColor: theme.colors.primaryContainer,
            maxWidth: 500,
            maxHeight: "90%",
            borderRadius: 10,
            marginHorizontal: 20,
            alignItems: "center",
            padding: 20,
        },
        form: {
            gap: 15,
            alignItems: "center",
            width: "100%",
            marginVertical: 20,
        },
        signUp: {
            gap: 15,
            alignItems: "center",
            width: "100%",
            marginTop: 40,
        },
        field: {
            width: "100%",
            alignItems: "center",
            gap: 2,
        },
        input: {
            height: 35,
            lineHeight: 30,
            maxWidth: "100%",
            width: 500,
        },
        button: {
            width: 100,
        },
    });

    useEffect(() => {
        if (Object.values(auth).includes(false) === false) {
            test = postUser(name, team, email, password).then((res) => {
                setUser([
                    "Username: " + res.user_name,
                    "Email: " + res.user_email,
                    "Team: " + team,
                ]);
            });
            setVisibleSignUp(false);
            setSuccessPopUp(true);
        }
    }, [auth]);

    useEffect(() => {
        getTeams().then((teams) => {
            setItems(teams);
        });
    }, []);

    const [open, setOpen] = useState(false);
    const [team, setTeam] = useState(null);
    const [items, setItems] = useState();

    const handleDismiss = () => {
        setAuth({
            name: false,
            email: false,
            password: false,
            password2: false,
            check: false,
            team: false,
        });
        hideModal();
    };

    return (
        <Portal>
            <Modal
                visible={visibleSignUp}
                onDismiss={handleDismiss}
                contentContainerStyle={styles.modal}
                animationType="slide"
            >
                <Text variant="headlineSmall">Sign Up</Text>
                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text> Full Name: </Text>
                        <TextInput
                            onChangeText={setName}
                            value={name}
                            mode="outlined"
                            placeholder="John Smith"
                            multiline={false}
                            style={styles.input}
                        />
                        <IncorrectWarning
                            display={auth.name}
                            check={auth.check}
                            type="name"
                        />
                    </View>
                    <View style={styles.field}>
                        <Text> Email: </Text>
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            mode="outlined"
                            placeholder="enter email address"
                            multiline={false}
                            textAlign="default"
                            style={styles.input}
                        />
                        <IncorrectWarning
                            display={auth.email}
                            check={auth.check}
                            type="email"
                        />
                    </View>
                    <View style={styles.field}>
                        <Text> Password: </Text>
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            mode="outlined"
                            placeholder="enter password       "
                            multiline={false}
                            secureTextEntry={true}
                            textAlign="default"
                            style={styles.input}
                        />
                        <IncorrectWarning
                            display={auth.password}
                            check={auth.check}
                            type="password"
                        />
                    </View>
                    <View style={styles.field}>
                        <Text> Re-enter Password: </Text>
                        <TextInput
                            onChangeText={setPassword2}
                            value={password2}
                            mode="outlined"
                            placeholder="re-enter password   "
                            multiline={false}
                            secureTextEntry={true}
                            textAlign="default"
                            style={styles.input}
                        />
                        <IncorrectWarning
                            display={auth.password2}
                            check={auth.check}
                            type="password2"
                        />
                    </View>
                    <View style={styles.field}>
                        <Text>Choose Your Team</Text>
                        <DropDownPicker
                            open={open}
                            value={team}
                            items={items}
                            setOpen={setOpen}
                            setValue={setTeam}
                            setItems={setItems}
                            placeholder=""
                        />
                        <IncorrectWarning
                            display={auth.team}
                            check={auth.check}
                            type="team"
                        />
                    </View>
                    <Button
                        mode="outlined"
                        onPress={() =>
                            setAuth(
                                signUpForm(
                                    name,
                                    email,
                                    password,
                                    password2,
                                    team
                                )
                            )
                        }
                    >
                        Submit
                    </Button>
                </View>
            </Modal>
            <Modal
                visible={successPopUp}
                onDismiss={hideSuccess}
                onRequestClose={hideSuccess}
                contentContainerStyle={styles.modal}
                animationType="slide"
            >
                <Text>Congratulations your account it set up!</Text>
                <Text style={{ textAlign: `left` }}>{user[0]}</Text>
                <Text>{user[1]}</Text>
                <Text>{user[2]}</Text>
                <Button mode="outlined" onPress={() => setSuccessPopUp(false)}>
                    Back to log in
                </Button>
            </Modal>
        </Portal>
    );
}
