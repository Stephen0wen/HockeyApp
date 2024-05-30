import { Modal, RadioButton, Text, useTheme } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

export default TeamFilter = ({
    teams,
    showTeam,
    toggleShowTeam,
    setFilterTeamId,
}) => {
    const theme = useTheme();
    const [value, setValue] = useState("");

    useEffect(() => {
        setFilterTeamId(value);
    }, [value]);

    const styles = StyleSheet.create({
        modal: {
            alignSelf: "center",
            backgroundColor: theme.colors.primaryContainer,
            borderRadius: 10,
            marginHorizontal: 20,
            alignItems: "center",
            padding: 10,
            height: 400,
        },
        container: {
            gap: 15,
            alignItems: "center",
            width: 280,
        },
        buttonContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: 250,
        },
        label: {
            width: 200,
            textAlign: "right",
        },
        title: {
            marginBottom: 10,
        },
    });

    return (
        <Modal
            visible={showTeam}
            onDismiss={toggleShowTeam}
            contentContainerStyle={styles.modal}
            animationType="slide"
        >
            <Text variant="headlineMedium" style={styles.title}>
                Filter By Team
            </Text>
            <ScrollView contentContainerStyle={styles.container}>
                <RadioButton.Group onValueChange={setValue} value={value}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.label}>All</Text>
                        <RadioButton value="" />
                    </View>
                    {teams.map((team) => {
                        return (
                            <View style={styles.buttonContainer}>
                                <Text style={styles.label}>
                                    {team.team_name}
                                </Text>
                                <RadioButton value={team.team_id} />
                            </View>
                        );
                    })}
                </RadioButton.Group>
            </ScrollView>
        </Modal>
    );
};
