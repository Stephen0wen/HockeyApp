import { Text, Surface, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import UserViewSwitch from "./UserViewSwitch";
import { useEffect } from "react";

export default function UserView({ user, userRole, setUserRole }) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        surface: {
            width: 150,
            margin: 10,
            borderRadius: 20,
        },
        text: {
            color: theme.colors.primary,
            textAlign: "center",
        },
    });

    if (!user.user_roles.length) {
        return <></>;
    }

    return (
        <Surface style={styles.surface}>
            <Text variant="titleMedium" style={styles.text}>
                View As
            </Text>
            <UserViewSwitch
                label="public"
                userRole={userRole}
                setUserRole={setUserRole}
            />
            {user.user_roles.map((role) => {
                return (
                    <UserViewSwitch
                        label={role}
                        userRole={userRole}
                        setUserRole={setUserRole}
                    />
                );
            })}
        </Surface>
    );
}
