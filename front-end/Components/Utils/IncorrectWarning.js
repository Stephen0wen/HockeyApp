import React from "react";
import { nameValidator } from "./nameValidator";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
returnText = "";

const IncorrectWarning = (props) => {
  if (props.display === false && props.check === true) display = "default";
  else display = "none";

  if (props.type === "name") {
    returnText = "Name can't be empty.";
  }
  if (props.type === "email") {
    returnText = "Please enter a valid email address.";
  }
  if (props.type === "password") {
    returnText = "Password must be more than 7 characters.";
  }
  if (props.type === "password2") {
    returnText = "Passwords must match.";
  }
  if (props.type === "team") {
    returnText = "Please choose your team.";
  }
  return <Text display={display}> {returnText} </Text>;
};

export default IncorrectWarning;
