import { StyleSheet, ScrollView, View } from "react-native";
import LoadScreen from "../LoadScreen";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { getMyFixtures, getMyResponses } from "../../ApiRequests";
import { Text, Button } from "react-native-paper";
import MyFixtureCard from "./MyFixtureCard";
import { MyFixtureContext } from "../../Contexts/MyFixtureContext";

export default function MyFixturesList({ navigation }) {
    const { user } = useContext(UserContext);

    const [myFixtures, setMyFixtures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setCurrentFixture, setMyResponses } = useContext(MyFixtureContext);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([getMyFixtures(user.team_id), getMyResponses(user.user_id)])
            .then(([apiMyFixtures, apiMyResponses]) => {
                setMyFixtures(apiMyFixtures);
                setMyResponses(apiMyResponses);
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
                            <View style={styles.linkContainer}>
                                <Button
                                    style={styles.button}
                                    onPress={() => {
                                        setCurrentFixture(fixture);
                                        navigation.navigate("TeamSheet");
                                    }}
                                >
                                    View Team Sheet
                                </Button>
                                <Button
                                    style={styles.button}
                                    onPress={() => {
                                        setCurrentFixture(fixture);
                                        navigation.navigate("Details");
                                    }}
                                >
                                    View Details
                                </Button>
                            </View>
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
    linkContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        maxWidth: 500,
        width: "100%",
        paddingHorizontal: 0,
    },
    button: {
        marginVertical: -5,
    },
});
