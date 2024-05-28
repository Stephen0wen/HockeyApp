import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

export default function LeagueTable({ leagueTable }) {
    return (
        <DataTable style={styles.table}>
            <DataTable.Header style={styles.header}>
                <DataTable.Title style={styles.column}></DataTable.Title>
                <DataTable.Title style={styles.teamColumn}>
                    Team
                </DataTable.Title>
                <DataTable.Title style={styles.column}>Pts</DataTable.Title>
                <DataTable.Title style={styles.column}>W</DataTable.Title>
                <DataTable.Title style={styles.column}>D</DataTable.Title>
                <DataTable.Title style={styles.column}>L</DataTable.Title>
                <DataTable.Title style={styles.column}>GD</DataTable.Title>
                <DataTable.Title style={styles.column}>GF</DataTable.Title>
                <DataTable.Title style={styles.column}>GA</DataTable.Title>
            </DataTable.Header>

            {leagueTable.map((entry, index) => (
                <DataTable.Row key={index} style={styles.row}>
                    <DataTable.Cell style={styles.column}>
                        {index + 1}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.teamColumn}>
                        {entry.team_name}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.column}>
                        {entry.points}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.column}>
                        {entry.wins}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.column}>
                        {entry.draws}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.column}>
                        {entry.losses}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.column}>
                        {entry.goals_for - entry.goals_against}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.column}>
                        {entry.goals_for}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.column}>
                        {entry.goals_against}
                    </DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
    );
}

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
    teamColumn: {
        flex: 3,
        paddingHorizontal: 5,
    },
    column: {
        flex: 1,
        paddingHorizontal: 5,
    },
});
