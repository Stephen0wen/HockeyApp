import { StyleSheet, ScrollView } from "react-native";
import LoadScreen from "./LoadScreen";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { getMyFixtures } from "../ApiRequests";
import { Text, Button } from "react-native-paper";
import MyFixtureCard from "./MyFixtureCard";
import { MyFixtureContext } from "../Contexts/MyFixtureContext";

export default function MyFixturesList({ navigation }) {
    const { user } = useContext(UserContext);
    const [myFixtures, setMyFixtures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setCurrentFixture } = useContext(MyFixtureContext);

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
                        <MyFixtureCard
                            key={fixture.fixture_id}
                            fixture={fixture}
                        >
                            <Button
                                onPress={() => {
                                    setCurrentFixture(fixture);
                                    navigation.navigate("TeamSheet");
                                }}
                            >
                                View Team Sheet
                            </Button>
                        </MyFixtureCard>
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
