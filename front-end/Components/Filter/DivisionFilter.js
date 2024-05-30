import { Modal, RadioButton, Text, useTheme } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

export default DivisionFilter = ({
    showDivision,
    toggleShowDivision,
    setFilterDivision,
}) => {
    const theme = useTheme();
    const [value, setValue] = useState("");

    useEffect(() => {
        setFilterDivision(value);
    }, [value]);

    const styles = StyleSheet.create({
        modal: {
            alignSelf: "center",
            backgroundColor: theme.colors.secondaryContainer,
            borderRadius: 10,
            marginHorizontal: 20,
            alignItems: "center",
            padding: 10,
            height: 180,
        },
        container: {
            gap: 15,
            alignItems: "center",
            width: 220,
        },
        buttonContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: 120,
        },
        label: {
            width: 80,
            textAlign: "right",
        },
        title: {
            marginBottom: 10,
        },
    });

    return (
        <Modal
            visible={showDivision}
            onDismiss={toggleShowDivision}
            contentContainerStyle={styles.modal}
            animationType="slide"
        >
            <Text variant="headlineMedium" style={styles.title}>
                Filter By Division
            </Text>
            <ScrollView contentContainerStyle={styles.container}>
                <RadioButton.Group onValueChange={setValue} value={value}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.label}>All</Text>
                        <RadioButton value="" />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.label}>Division 1</Text>
                        <RadioButton value="1" />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.label}>Division 2</Text>
                        <RadioButton value="2" />
                    </View>
                </RadioButton.Group>
            </ScrollView>
        </Modal>
    );
};
