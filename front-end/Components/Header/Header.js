import { StyleSheet, View, StatusBar } from "react-native";
import { useTheme, Surface } from "react-native-paper";
import LoginButton from "../Login/LoginButton";
import Logo from "./Logo";
import UserAvatar from "../User/UserAvatar";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

export default function Header() {
    const theme = useTheme();
    const { user } = useContext(UserContext);

    let userUi;
    if (user) {
        userUi = <UserAvatar />;
    }
    if (!user) {
        userUi = <LoginButton />;
    }

    const styles = StyleSheet.create({
        surface: {
            backgroundColor: theme.colors.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
        },
        content: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "max-content",
            padding: 5,
        },
        rightContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
        },
        text: {
            color: theme.colors.onPrimary,
        },
    });

    return (
        <Surface style={styles.surface} elevation={0}>
            <View style={styles.content}>
                <Logo />
                <View style={styles.rightContainer}>{userUi}</View>
            </View>
        </Surface>
    );
}
