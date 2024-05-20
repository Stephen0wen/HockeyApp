import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export default function UpcomingPage() {
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
            <Text>Upcoming Page</Text>
        </Card>
    );
}
