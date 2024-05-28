import { StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import LeagueTable from "./LeagueTable";
import LeagueSelector from "./LeagueSelector";
import { useEffect, useState } from "react";
import LoadScreen from "../LoadScreen";
import { getLeagueTables } from "../../ApiRequests";

export default function HomePage() {
    const [leagueTables, setLeagueTables] = useState({});
    const [displayedLeague, setDisplayedLeague] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getLeagueTables()
            .then((apiLeagueTables) => {
                setLeagueTables(apiLeagueTables);
                const leagueOptions = Object.keys(apiLeagueTables);
                setDisplayedLeague(leagueOptions[0]);
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (isLoading) {
        return <LoadScreen message="Loading League Tables..." />;
    }

    return (
        <>
            <LeagueSelector
                leagueTables={leagueTables}
                displayedLeague={displayedLeague}
                setDisplayedLeague={setDisplayedLeague}
            />
            <ScrollView style={styles.scroll}>
                <Card style={styles.container}>
                    <LeagueTable leagueTable={leagueTables[displayedLeague]} />
                </Card>
            </ScrollView>
        </>
    );
}

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
