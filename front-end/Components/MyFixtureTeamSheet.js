import { Button } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { MyFixtureContext } from "../Contexts/MyFixtureContext";
import { UserContext } from "../Contexts/UserContext";
import MyFixtureCard from "./MyFixtureCard";
import LoadScreen from "./LoadScreen";
import TeamSheet from "./TeamSheet";

export default function MyFixtureTeamSheet({ navigation }) {
    const { currentFixture, setCurrentFixture } = useContext(MyFixtureContext);
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    let display;
    if (isLoading) {
        display = <LoadScreen message="Loading Team Sheet..." />;
    }

    if (!isLoading) {
        display = <TeamSheet />;
    }

    return (
        <>
            <MyFixtureCard fixture={currentFixture}>{display}</MyFixtureCard>
            <Button
                onPress={() => {
                    navigation.goBack();
                    setCurrentFixture({});
                }}
            >
                Back
            </Button>
        </>
    );
}
