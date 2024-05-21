import { StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import LeagueTable from "./LeagueTable";
import LeagueSelector from "./LeagueSelector";

export default function HomePage() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            margin: 5,
            padding: 5,
        },
        scroll: {
            height: "100%",
            width: "100%",
        },
    });
    return (
        <>
            <LeagueSelector />
            <ScrollView style={styles.scroll}>
                <Card style={styles.container}>
                    <LeagueTable />
                </Card>
            </ScrollView>
        </>
    );
}
