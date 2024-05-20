import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export default function ResultsPage() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            margin: 20,
        },
    });

    return (
        <Card style={styles.container}>
            <Text>Results Page</Text>
        </Card>
    );
}
