import { StyleSheet, View } from "react-native";
import { Switch, Text } from "react-native-paper";
import { useEffect, useState } from "react";

export default function UserViewSwitch({ label, userRole, setUserRole }) {
    const [isSwitchedOn, setIsSwitchedOn] = useState(false);

    useEffect(() => {
        setIsSwitchedOn(userRole === label);
    }, [userRole]);

    const updateValue = () => {
        setUserRole(label);
    };

    return (
        <View style={styles.container}>
            <Text>{label}</Text>
            <Switch value={isSwitchedOn} onValueChange={updateValue} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 10,
    },
});
