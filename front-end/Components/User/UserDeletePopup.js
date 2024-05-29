import { Modal, Text, useTheme, Button, Divider } from "react-native-paper";
import React, { useState } from "react";
import { deleteUserById } from "./deleteUserById";

export function UserDeletePopup({
  visibleUserDelete,
  toggleModalUserDelete,
  user,
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

  const [visibleUserDeleteSuccess, setVisibleUserDeleteSuccess] =
    useState(false);
  const toggleModalUserDeleteSuccess = () =>
    setVisibleUserDeleteSuccess(!visibleUserDeleteSuccess);

  const [visibleUserDeleteFail, setVisibleUserDeleteFail] = useState(false);
  const toggleModalUserDeleteFail = () =>
    setVisibleUserDeleteFail(!visibleUserDeleteFail);

  const handleUserDeleteYes = () => {
    deleteUserById(user.user_id)
      .then(() => {
        toggleModalUserDeleteSuccess();
        toggleModalUserDelete();
      })
      .catch((error) => {
        toggleModalUserDeleteFail();
        toggleModalUserDelete();
      });
  };

  return (
    <>
      <Modal
        visible={visibleUserDelete}
        onDismiss={toggleModalUserDelete}
        contentContainerStyle={containerStyle}
        animationType="slide"
      >
        <Text>WARNING</Text>
        <Text>Are you sure you want to delete your account?</Text>
        <Button
          width="100%"
          marginBottom={"5%"}
          marginTop={"10%"}
          mode="outlined"
          onPress={handleUserDeleteYes}
        >
          <Divider />
          <Text>Yes</Text>
        </Button>
      </Modal>
      <Modal
        visible={visibleUserDeleteSuccess}
        onDismiss={toggleModalUserDeleteSuccess}
        contentContainerStyle={containerStyle}
        animationType="slide"
      >
        <Text>SUCCESS</Text>
        <Text>User '{user.user_name}' has been deleted</Text>
        <Button
          width="100%"
          marginBottom={"5%"}
          marginTop={"10%"}
          mode="outlined"
          onPress={toggleModalUserDeleteSuccess}
        >
          <Divider />
          <Text>Dismiss</Text>
        </Button>
      </Modal>
      <Modal
        visible={visibleUserDeleteFail}
        onDismiss={toggleModalUserDeleteFail}
        contentContainerStyle={containerStyle}
        animationType="slide"
      >
        <Text>FAILURE</Text>
        <Text>Please login first!</Text>
        <Button
          width="100%"
          marginBottom={"5%"}
          marginTop={"10%"}
          mode="outlined"
          onPress={toggleModalUserDeleteFail}
        >
          <Divider />
          <Text>Dismiss</Text>
        </Button>
      </Modal>
    </>
  );
}
