import { Button } from "react-native-paper";
import { useState } from "react";
import { StyleSheet } from "react-native";
import UserDetails from "./UpdateUserDetails";

export default function UserUpdate(user) {
  const [visible, setVisible] = useState(false);

  const showUserDetails = () => setVisible(!visible);

  const styles = StyleSheet.create({
    button: {
      width: 150,
      height: 40,
      margin: 10,
    },
  });
  return (
    <>
      <UserDetails
        visible={visible}
        setVisible={setVisible}
        showUserDetails={showUserDetails}
        user={user}
      />
      <Button
        mode="elevated"
        compact="true"
        style={styles.button}
        onPress={showUserDetails}
      >
        Update My Details
      </Button>
    </>
  );
}
