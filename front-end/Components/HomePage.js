import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import LeagueTable from "./LeagueTable";

export default function HomePage() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
        },
    });
    return (
        <Card style={styles.container}>
            <LeagueTable />
        </Card>
    );
}
