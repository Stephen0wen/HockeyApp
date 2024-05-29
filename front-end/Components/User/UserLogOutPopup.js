import { Modal, Text, useTheme, Button, Divider } from "react-native-paper";
import React, { useState } from "react";

export default function UserLogOutPopup({
  visibleUserLogOff,
  toggleModalUserLogOff,
  user,
  setUser,
  setUserRole,
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

  const [visibleUserLogOffSuccess, setVisibleUserLogOffSuccess] =
    useState(false);
  const toggleModalUserLogOffSuccess = () =>
    setVisibleUserLogOffSuccess(!visibleUserLogOffSuccess);

  const handleUserLogOffYes = () => {
    toggleModalUserLogOff();
    toggleModalUserLogOffSuccess();
  };
  return (
    <>
      <Modal
        visible={visibleUserLogOff}
        onDismiss={toggleModalUserLogOff}
        contentContainerStyle={containerStyle}
        animationType="slide"
      >
        <Text>WARNING</Text>
        <Text>Are you sure you want to log off?</Text>
        <Button
          width="100%"
          marginBottom={"5%"}
          marginTop={"10%"}
          mode="outlined"
          onPress={handleUserLogOffYes}
        >
          <Divider />
          <Text>Yes</Text>
        </Button>
        <Button
          width="100%"
          marginBottom={"5%"}
          marginTop={"10%"}
          mode="outlined"
          onPress={toggleModalUserLogOff}
        >
          <Divider />
          <Text>No</Text>
        </Button>
      </Modal>
      <Modal
        visible={visibleUserLogOffSuccess}
        onDismiss={() => {
          toggleModalUserLogOffSuccess;
          setUser(null);
          setUserRole("public");
        }}
        contentContainerStyle={containerStyle}
        animationType="slide"
      >
        <Text>You have logged off.</Text>
        <Button
          width="100%"
          marginBottom={"5%"}
          marginTop={"10%"}
          mode="outlined"
          onPress={() => {
            toggleModalUserLogOffSuccess;
            setUser(null);
            setUserRole("public");
          }}
        >
          <Divider />
          <Text>Dismiss</Text>
        </Button>
      </Modal>
    </>
  );
}
