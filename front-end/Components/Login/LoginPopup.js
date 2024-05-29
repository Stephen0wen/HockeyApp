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
  const toggleModalLogInError = () => setVisibleLogInError(!visibleLogInError);

  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { user, setUser } = useContext(UserContext);

  const handleLogIn = () => {
    getUsers().then((users) => {
      const correctUser = users.find((user) => user.user_email === username);
      setPassword();
      if (!correctUser) {
        setLoginErrorMsg("User not found!");
        toggleModalLogInError();
      } else if (correctUser.user_password !== password) {
        toggleModalLogInError();
        setLoginErrorMsg("Incorrect password!");
      } else {
        setUser({ ...correctUser, user_roles: [] });
        setVisible(!visible);
        toggleModalLogIn();
      }
    });
  };

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
        <Text> Email: </Text>
        <TextInput
          onChangeText={setUsername}
          value={username}
          mode="outlined"
          multiline={false}
          placeholder="enter name here"
          textAlign="default"
          style={{ minWidth: "20000" }}
        ></TextInput>
        <Text marginTop={"5%"}> Password: </Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
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
          onPress={() => handleLogIn()}
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
      <LoginSuccess
        visibleLogInSuccess={visibleLogInSuccess}
        toggleModalLogIn={toggleModalLogIn}
      />
      <LoginError
        visibleLogInError={visibleLogInError}
        toggleModalLogInError={toggleModalLogInError}
        loginErrorMsg={loginErrorMsg}
      />
    </Portal>
  );
}
