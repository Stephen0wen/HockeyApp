import { Modal, Text, useTheme, Button, Divider } from "react-native-paper";
import React from "react";

export default function LoginError({
  visibleLogInError,
  toggleModalLogInError,
  loginErrorMsg,
}) {
  const theme = useTheme();
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
    <Modal
      visible={visibleLogInError}
      onDismiss={toggleModalLogInError}
      contentContainerStyle={containerStyle}
      animationType="slide"
    >
      <Text>{loginErrorMsg}</Text>
      <Button
        width="100%"
        marginBottom={"5%"}
        marginTop={"10%"}
        mode="outlined"
        onPress={toggleModalLogInError}
      >
        <Divider />
        <Text>Dismiss</Text>
      </Button>
    </Modal>
  );
}
