import { StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function UserDelete({ toggleModalUserDelete }) {
  const theme = useTheme();

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
      buttonColor={theme.colors.errorContainer}
      textColor={theme.colors.onErrorContainer}
      style={styles.button}
      onPress={toggleModalUserDelete}
    >
      Delete My Account
    </Button>
  );
}
