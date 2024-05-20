import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

export default function LeagueTable() {
    const data = [
        {
            team_name: "Leicester Wolves",
            points: 45,
            wins: 12,
            draws: 4,
            losses: 4,
            goals_for: 108,
            goals_against: 67,
        },
        {
            team_name: "Old Bags",
            points: 38,
            wins: 10,
            draws: 4,
            losses: 6,
            goals_for: 102,
            goals_against: 77,
        },
    ];

    const styles = StyleSheet.create({
        table: {
            width: "100%",
            textAlign: "center",
        },
        header: {
            height: 45,
            width: "100%",
            color: "#fff",
            paddingHorizontal: 5,
        },
        row: {
            paddingHorizontal: 5,
        },
        title: {
            flex: 1,
            fontSize: 30,
            alignItems: "center",
            paddingHorizontal: 5,
        },
        teamTitle: {
            flex: 4,
            paddingHorizontal: 5,
        },
        cell: {
            flex: 1,
            paddingHorizontal: 5,
        },
        teamCell: {
            flex: 4,
            paddingHorizontal: 5,
        },
    });

    return (
        <DataTable style={styles.table}>
            <DataTable.Header style={styles.header}>
                <DataTable.Title style={styles.teamTitle}>Team</DataTable.Title>
                <DataTable.Title style={styles.title}>Pts</DataTable.Title>
                <DataTable.Title style={styles.title}>W</DataTable.Title>
                <DataTable.Title style={styles.title}>D</DataTable.Title>
                <DataTable.Title style={styles.title}>L</DataTable.Title>
                <DataTable.Title style={styles.title}>GD</DataTable.Title>
                <DataTable.Title style={styles.title}>GF</DataTable.Title>
                <DataTable.Title style={styles.title}>GA</DataTable.Title>
            </DataTable.Header>

            {data.map((entry, index) => (
                <DataTable.Row key={index} style={styles.row}>
                    <DataTable.Cell style={styles.teamCell}>
                        {entry.team_name}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                        {entry.points}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                        {entry.wins}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                        {entry.draws}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                        {entry.losses}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                        {entry.goals_for - entry.goals_against}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                        {entry.goals_for}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                        {entry.goals_against}
                    </DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
    );
}
