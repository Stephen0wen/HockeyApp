import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function UserLogOut({ toggleModalUserLogOff }) {
  const styles = StyleSheet.create({
    button: {
      width: 150,
      height: 40,
      margin: 10,
    },
  });

  return (
    <Button
      mode="elevated"
      compact="true"
      style={styles.button}
      onPress={toggleModalUserLogOff}
    >
      Log Out
    </Button>
  );
}
