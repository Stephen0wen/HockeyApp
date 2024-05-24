import { StyleSheet, ScrollView } from "react-native";
import FixtureCard from "./FixtureCard";
import MatchdayContainer from "./MatchdayContainer";
import MyFixtureUI from "./MyFixtureUI";
import LoadScreen from "./LoadScreen";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { getMyFixtures } from "../ApiRequests";
import { Text } from "react-native-paper";

export default function MyFixturesPage() {
    const { user } = useContext(UserContext);
    const [myFixtures, setMyFixtures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getMyFixtures(user.team_id)
            .then((apiMyFixtures) => {
                setMyFixtures(apiMyFixtures);
            })
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <LoadScreen message="Loading your fixtures..." />;
    }

    return (
        <>
            <Text variant="headlineMedium" style={styles.title}>
                My Fixtures
            </Text>
            <ScrollView contentStyle={styles.scroll}>
                {myFixtures.map((fixture) => {
                    return (
                        <MatchdayContainer
                            key={fixture.fixture_id}
                            date={new Date(
                                fixture.match_date
                            ).toLocaleDateString()}
                        >
                            <FixtureCard fixture={fixture}>
                                <MyFixtureUI />
                            </FixtureCard>
                        </MatchdayContainer>
                    );
                })}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        alignItems: "center",
        gap: 5,
        padding: 5,
    },
    title: {
        textAlign: "center",
        margin: 5,
    },
});
