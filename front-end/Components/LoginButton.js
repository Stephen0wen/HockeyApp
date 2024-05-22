import { Button, useTheme } from "react-native-paper";
import { useState } from "react";
import { StyleSheet } from "react-native";
import LoginPopup from "./LoginPopup";

export default function LoginButton() {

    const theme = useTheme();
    const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(!visible);

    const styles = StyleSheet.create({
        button: {
            marginTop: 0,
            backgroundColor: theme.colors.primaryContainer,
            color: theme.colors.onPrimaryContainer,
        },
    });

    return (
        <>
            <LoginPopup visible={visible} setVisible={setVisible} />
            <Button style={styles.button} onPress={showModal}>
                Log In
            </Button>
        </>
    );
}
