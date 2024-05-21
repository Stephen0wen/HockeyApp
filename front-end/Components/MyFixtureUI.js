import { StyleSheet, View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";
import { useState } from "react";

export default function MyFixtureUI() {
    const [value, setValue] = useState("");
    // This will be replaced with the response stored in the database

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
        },
        button: {
            flex: 2,
            margin: 0,
            paddingH: 0,
            lineHeight: 20,
            fontSize: 20,
            width: 80,
        },
        details: {
            marginLeft: 5,
            marginRight: 80,
        },
    });

    return (
        <View style={styles.container}>
            <Text variant="labelMedium" style={styles.details}>
                Details
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
