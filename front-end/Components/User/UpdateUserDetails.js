import {
  Modal,
  Text,
  useTheme,
  Button,
  Divider,
  Portal,
  TextInput,
} from "react-native-paper";
import React, { useState, useEffect } from "react";
import { valid_postcode } from "../../Components/Utils/postcodeValidator";
import { valid_phoneNumber } from "../Utils/phoneNumberValidator";
import { emailValidator } from "../Utils/emailValidator";
import DropDownPicker from "react-native-dropdown-picker";
import { getTeams } from "../Utils/teamFetcher";
import { patchUser } from "../../ApiRequests";
import SuccessfulUserPatch from "./SuccessfulUserPatch";

export default function UserDetails({ visible, setVisible, user }) {
  const currentUser = user.user;
  const [username, setUsername] = useState(currentUser.user_name);
  const [address1, setAddress1] = useState(currentUser.user_address_1);
  const [address2, setAddress2] = useState(currentUser.user_address_2);
  const [postCode, setPostcode] = useState(currentUser.user_postcode);
  const [dob, setDob] = useState(currentUser.user_dob);
  const [phone, setPhone] = useState(currentUser.user_phone);
  const [email, setEmail] = useState(currentUser.user_email);
  const [password, setPassword] = useState(currentUser.user_password);
  const [team, setTeam] = useState(currentUser.team_name);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [display, setDisplay] = useState("");
  const [display2, setDisplay2] = useState("");
  const [display3, setDisplay3] = useState("");
  const [display4, setDisplay4] = useState("");
  const [display5, setDisplay5] = useState("");
  const [display6, setDisplay6] = useState("");
  const [display7, setDisplay7] = useState("");
  const [display8, setDisplay8] = useState("");
  const [display9, setDisplay9] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState();
  const [canSubmit, setCanSubmit] = useState(true);
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [visiblePatchSuccess, setVisiblePatchSuccess] = useState(false);
  const toggleModalSuccess = () => setVisiblePatchSuccess(!visiblePatchSuccess);
  const [message, setMessage] = useState();
  const [visibleTeam, setVisibleTeam] = useState("flex");
  const toggleVisibleTeam = () => setVisibleTeam("flex");

  function isValidDate(stringDate) {
    return !isNaN(Date.parse(stringDate));
  }
  const hideModal = () => setVisible(false);
  const theme = useTheme();
  const containerStyle = {
    backgroundColor: theme.colors.onSecondary,
    padding: 20,
    width: "auto",
    marginTop: "14%",
    flexGrow: 1,
    borderRadius: 10,
    justifyContent: "center",
    display: "flex",
  };

  useEffect(() => {
    getTeams().then((teams) => {
      setItems(teams);
    });
  }, []);

  useEffect(() => {
    const validatePatch = {
      1: display,
      4: display4,
      5: display5,
      6: display6,
      7: display7,
      8: display8,
    };
    let arr = Object.entries(validatePatch);
    let checker = [];
    arr.forEach((element) => {
      if (element[1] !== "") {
        checker.push(element[1]);
      }
    });
    if (checker.length > 0) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  }, [display, display4, display5, display6, display7, display8]);

  return (
    <Portal>
      <Modal
        visible={visible}
        contentContainerStyle={containerStyle}
        animationType="slide"
        onDismiss={hideModal}
      >
        <Text variant="displaySmall" textAlign="default">
          Change Details
        </Text>
        <Text variant="labelLarge" textAlign="default">
          * indicates a required field
        </Text>
        <Text>*Full Name:</Text>
        <TextInput
          onChangeText={setUsername}
          value={username}
          mode="outlined"
          multiline={false}
          textAlign="default"
          style={{
            minWidth: "20000",
            fontSize: 12,
            height: 20,
          }}
          right={
            <TextInput.Icon
              icon="format-clear"
              onPress={() => {
                setUsername("");
              }}
            />
          }
        ></TextInput>
        <Text variant="labelMedium">{display}</Text>
        <Text>Address line 1:</Text>
        <TextInput
          onChangeText={setAddress1}
          value={address1}
          mode="outlined"
          multiline={false}
          textAlign="default"
          style={{ minWidth: "20000", fontSize: 12, height: 20 }}
          right={
            <TextInput.Icon
              icon="format-clear"
              onPress={() => {
                setAddress1("");
              }}
            />
          }
        ></TextInput>
        <Text variant="labelMedium">{display2}</Text>
        <Text>Address line 2:</Text>
        <TextInput
          onChangeText={setAddress2}
          value={address2}
          mode="outlined"
          multiline={false}
          textAlign="default"
          style={{ minWidth: "20000", fontSize: 12, height: 20 }}
          right={
            <TextInput.Icon
              icon="format-clear"
              onPress={() => {
                setAddress2("");
              }}
            />
          }
        ></TextInput>
        <Text variant="labelMedium">{display3}</Text>
        <Text>Postcode:</Text>
        <TextInput
          onChangeText={setPostcode}
          value={postCode}
          mode="outlined"
          multiline={false}
          textAlign="default"
          style={{ minWidth: "20000", fontSize: 12, height: 20 }}
          right={
            <TextInput.Icon
              icon="format-clear"
              onPress={() => {
                setPostcode("");
              }}
            />
          }
        ></TextInput>
        <Text variant="labelMedium">{display4}</Text>
        <Text>Date Of Birth (YYYY-MM-DD):</Text>
        <TextInput
          onChangeText={setDob}
          value={dob}
          mode="outlined"
          multiline={false}
          textAlign="default"
          style={{ minWidth: "20000", fontSize: 12, height: 20 }}
          right={
            <TextInput.Icon
              icon="format-clear"
              onPress={() => {
                setDob("");
              }}
            />
          }
        ></TextInput>
        <Text variant="labelMedium">{display5}</Text>
        <Text>Phone Number:</Text>
        <TextInput
          onChangeText={setPhone}
          value={phone}
          mode="outlined"
          multiline={false}
          textAlign="default"
          style={{ minWidth: "20000", fontSize: 12, height: 20 }}
          right={
            <TextInput.Icon
              icon="format-clear"
              onPress={() => {
                setPhone("");
              }}
            />
          }
        ></TextInput>
        <Text variant="labelMedium">{display6}</Text>
        <Text>*Email Address:</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          mode="outlined"
          multiline={false}
          textAlign="default"
          style={{ minWidth: "20000", fontSize: 12, height: 20 }}
          right={
            <TextInput.Icon
              icon="format-clear"
              onPress={() => {
                setEmail("");
              }}
            />
          }
        ></TextInput>
        <Text variant="labelMedium">{display7}</Text>
        <Text>*Password:</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          mode="outlined"
          multiline={false}
          textAlign="default"
          style={{ minWidth: "20000", fontSize: 12, height: 20 }}
          secureTextEntry={visiblePassword}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => {
                setVisiblePassword(!visiblePassword);
              }}
            />
          }
        ></TextInput>
        <Text variant="labelMedium">{display8}</Text>
        <Text style={{ display: visibleTeam }}>*Team:</Text>
        <DropDownPicker
          open={open}
          value={team}
          items={items}
          setOpen={setOpen}
          setValue={setTeam}
          setItems={setItems}
          placeholder={team}
          style={{ display: visibleTeam }}
          // style={{ height: 40 }}
        />
        <Text variant="labelMedium">{display9}</Text>
        <Button
          mode="outlined"
          onPressIn={() => {
            if (username.length < 1) {
              setDisplay("Name must not be empty!");
            } else setDisplay("");
            if (dob.length > 1) {
              if (isValidDate(dob)) {
                setDisplay5("");
              } else {
                setDisplay5("If entering dob, please use YYYY-MM-DD format.");
              }
            } else setDisplay5("");
            if (postCode.length > 1) {
              if (valid_postcode(postCode)) {
                setDisplay4("");
              } else {
                setDisplay4(
                  "If entering postcode, please enter valid postcode."
                );
              }
            } else setDisplay4("");
            if (phone.length > 1) {
              if (valid_phoneNumber(phone)) {
                setDisplay6("");
              } else {
                setDisplay6("Phone numbers must be from 9 to 11 digits long.");
              }
            } else setDisplay6("");
            if (email.length > 1) {
              if (emailValidator(email) === "valid email address") {
                setDisplay7("");
              } else {
                setDisplay7(emailValidator(email));
              }
            } else setDisplay7("Email Address Required");
            if (password.length < 8) {
              setDisplay8("Password Must be 8 or more characters long.");
            } else setDisplay8("");
            setSubmitAttempt(true);
          }}
          onPress={() => {
            if (submitAttempt === true && canSubmit === true) {
              patchUser(
                {
                  user_name: username,
                  team_name: team,
                  user_address_1: address1,
                  user_address_2: address2,
                  user_postcode: postCode,
                  user_dob: dob,
                  user_phone: phone,
                  user_email: email,
                  user_password: password,
                },
                currentUser.user_id
              ),
                setMessage("Congratulations you have updated your account!"),
                toggleModalSuccess();
              setVisibleTeam("none");
            } else {
              setMessage(
                "Please ensure all inputs do not have errors before submitting."
              ),
                toggleModalSuccess();
              setVisibleTeam("none");
            }
          }}
        >
          Submit
        </Button>
        <SuccessfulUserPatch
          visiblePatchSuccess={visiblePatchSuccess}
          toggleModalSuccess={toggleModalSuccess}
          message={message}
          toggleVisibleTeam={toggleVisibleTeam}
        />
        <Divider />
      </Modal>
    </Portal>
  );
}
