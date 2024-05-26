import MatchdayContainer from "./MatchdayContainer";
import FixtureCard from "./FixtureCard";
import MyFixtureUI from "./MyFixtureUI";
import { Button } from "react-native-paper";
import { useContext } from "react";
import { MyFixtureContext } from "../Contexts/MyFixtureContext";

export default function MyFixtureCard({ fixture, navigation }) {
    const { setCurrentFixtureId } = useContext(MyFixtureContext);

    const handlePress = () => {
        setCurrentFixtureId(fixture.fixture_id);
        navigation.navigate("TeamSheet");
    };

    return (
        <MatchdayContainer
            key={fixture.fixture_id}
            date={new Date(fixture.match_date).toLocaleDateString()}
        >
            <FixtureCard fixture={fixture}>
                <MyFixtureUI />
            </FixtureCard>
            <Button onPress={handlePress}>View Team Sheet</Button>
        </MatchdayContainer>
    );
}
