import { StyleSheet, View } from "react-native";
import { SegmentedButtons, Text, useTheme } from "react-native-paper";
import { useEffect, useState, useContext } from "react";
import { MyFixtureContext } from "../../Contexts/MyFixtureContext";
import { UserContext } from "../../Contexts/UserContext";
import { putResponse } from "../../ApiRequests";

export default function MyFixtureUI({ fixture_id }) {
    const { myResponses } = useContext(MyFixtureContext);
    const { user } = useContext(UserContext);

    const {
        colors: { primary, onPrimary },
    } = useTheme();

    const [value, setValue] = useState("");

    useEffect(() => {
        const filteredResponses = myResponses.filter((response) => {
            return response.fixture_id === fixture_id;
        });
        if (!filteredResponses.length) {
            return;
        }
        const [{ response }] = filteredResponses;
        const lookup = {
            0: "no",
            1: "maybe",
            2: "yes",
        };
        const newValue = lookup[response];
        setValue(newValue);
    }, [myResponses]);

    const handleChange = (newValue) => {
        const oldValue = value;
        setValue(newValue);
        const lookup = {
            no: "0",
            maybe: "1",
            yes: "2",
        };
        putResponse({
            user_id: user.user_id,
            fixture_id,
            response: lookup[newValue],
        }).catch(() => {
            setValue(oldValue);
        });
    };

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignContent: "center",
        },
        button: {
            flex: 2,
            margin: 0,
            padding: 0,
        },
        label: {
            marginHorizontal: 22,
            marginVertical: 0,
        },
        yes: {
            backgroundColor: value === "yes" ? primary : "#0000",
        },
        maybe: {
            backgroundColor: value === "maybe" ? primary : "#0000",
        },
        no: {
            backgroundColor: value === "no" ? primary : "#0000",
        },
    });

    return (
        <View style={styles.container}>
            <Text variant="labelMedium" style={styles.label}>
                My Availability:
            </Text>
            <SegmentedButtons
                value={value}
                onValueChange={handleChange}
                checkedColor="#000"
                style={styles.button}
                density="high"
                buttons={[
                    {
                        value: "yes",
                        label: "Yes",
                        style: styles.yes,
                        checkedColor: onPrimary,
                    },
                    {
                        value: "maybe",
                        label: "IDK",
                        style: styles.maybe,
                        checkedColor: onPrimary,
                    },
                    {
                        value: "no",
                        label: "No",
                        style: styles.no,
                        checkedColor: onPrimary,
                    },
                ]}
            />
        </View>
    );
}
