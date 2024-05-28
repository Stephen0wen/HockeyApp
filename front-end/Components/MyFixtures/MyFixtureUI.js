import { StyleSheet, View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";
import { useState } from "react";

export default function MyFixtureUI() {
    const [value, setValue] = useState("");
    // This will be replaced with the response stored in the database

    return (
        <View style={styles.container}>
            <Text variant="labelMedium" style={styles.label}>
                My Availability:
            </Text>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                style={styles.button}
                density="high"
                buttons={[
                    {
                        value: "yes",
                        label: "Yes",
                    },
                    {
                        value: "maybe",
                        label: "IDK",
                    },
                    { value: "no", label: "No" },
                ]}
            />
        </View>
    );
}

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
});
