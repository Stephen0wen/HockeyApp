import { Button } from "react-native-paper";
import { useContext } from "react";
import { MyFixtureContext } from "../Contexts/MyFixtureContext";
import MyFixtureCard from "./MyFixtureCard";

import TeamSheet from "./TeamSheet";
import { ScrollView } from "react-native";

export default function TeamSheetPage({ navigation }) {
    const { currentFixture, setCurrentFixture } = useContext(MyFixtureContext);

    return (
        <>
            <ScrollView>
                <MyFixtureCard fixture={currentFixture}>
                    <TeamSheet />
                </MyFixtureCard>
                <Button
                    onPress={() => {
                        navigation.goBack();
                        setCurrentFixture({});
                    }}
                >
                    Back
                </Button>
            </ScrollView>
        </>
    );
}
