import { Modal, Text, useTheme, Button, Divider } from "react-native-paper";
import React from "react";

export default function SuccessfulUserPatch({
  visiblePatchSuccess,
  toggleModalSuccess,
  message,
  toggleVisibleTeam,
}) {
  const theme = useTheme();
  const containerStyle = {
    backgroundColor: theme.colors.primaryContainer,
    padding: 20,
    width: "auto",
    height: "auto",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10%",
    marginRight: "10%",
    display: "flex",
  };

  return (
    <Modal
      visible={visiblePatchSuccess}
      onDismiss={toggleModalSuccess}
      contentContainerStyle={containerStyle}
      animationType="slide"
    >
      <Text>{message}</Text>
      <Button
        width="100%"
        marginBottom={"5%"}
        marginTop={"10%"}
        mode="outlined"
        onPress={() => {
          toggleModalSuccess(), toggleVisibleTeam();
        }}
      >
        <Divider />
        <Text>Dismiss</Text>
      </Button>
    </Modal>
  );
}
