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
import { useState, useEffect } from "react";
import { signUpForm } from "./SignUpUtils/signUpForm";
import IncorrectWarning from "./SignUpUtils/IncorrectWarning";
import { getTeams } from "./SignUpUtils/teamFetcher";
import DropDownPicker from "react-native-dropdown-picker";

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

  useEffect(() => {
    if (Object.values(auth).includes(false) === false) {
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

  return (
    <Portal>
      <Modal
        visible={visibleSignUp}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
        animationType="slide"
      >
        <Text marginBottom={"5%"} variant="headlineLarge">
          Sign Up
        </Text>
        <Text marginTop={"5%"}> Full Name: </Text>
        <TextInput
          onChangeText={setName}
          value={name}
          mode="outlined"
          placeholder="enter full name         "
          multiline={false}
          textAlign="default"
        ></TextInput>
        <IncorrectWarning display={auth.name} check={auth.check} type="name" />
        <Text marginTop={"5%"}> email: </Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          mode="outlined"
          placeholder="enter email address"
          multiline={false}
          textAlign="default"
        ></TextInput>
        <IncorrectWarning
          display={auth.email}
          check={auth.check}
          type="email"
        />
        <Text marginTop={"5%"}> Password: </Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          mode="outlined"
          placeholder="enter password       "
          multiline={false}
          secureTextEntry={true}
          textAlign="default"
        ></TextInput>
        <IncorrectWarning
          display={auth.password}
          check={auth.check}
          type="password"
        />
        <Text marginTop={"5%"}> Re-enter Password: </Text>
        <TextInput
          onChangeText={setPassword2}
          value={password2}
          mode="outlined"
          placeholder="re-enter password   "
          multiline={false}
          secureTextEntry={true}
          textAlign="default"
        ></TextInput>
        <IncorrectWarning
          display={auth.password2}
          check={auth.check}
          type="password2"
        />
        <Text></Text>
        <DropDownPicker
          open={open}
          value={team}
          items={items}
          setOpen={setOpen}
          setValue={setTeam}
          setItems={setItems}
        />
        <IncorrectWarning display={auth.team} check={auth.check} type="team" />
        <Text />
        <Button
          width="100%"
          marginBottom={"5%"}
          mode="outlined"
          onPress={() =>
            setAuth(signUpForm(name, email, password, password2, team))
          }
        >
          <Divider />
          <Text>Submit </Text>
        </Button>
      </Modal>
      <Modal
        visible={successPopUp}
        onDismiss={hideSuccess}
        onRequestClose={hideSuccess}
        contentContainerStyle={containerStyle}
        animationType="slide"
      >
        <Text>
          Account set up. Once you guys are done on the back end this is where
          we will have to set up a patch request to the user database :D this
          will also need to set some sort of context for when the user is logged
          in to change log in to view account, etc.
        </Text>
        <Button
          width="100%"
          marginBottom={"5%"}
          mode="outlined"
          onPress={() => setSuccessPopUp(false)}
        >
          <Text>Submit </Text>
        </Button>
      </Modal>
    </Portal>
  );
}
