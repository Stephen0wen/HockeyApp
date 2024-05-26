import { Button, Text } from "react-native-paper";
import { useContext } from "react";
import { MyFixtureContext } from "../Contexts/MyFixtureContext";
import MyFixtureCard from "./MyFixtureCard";

export default function MyFixtureTeamSheet({ navigation }) {
    const { currentFixture, setCurrentFixture } = useContext(MyFixtureContext);

    const handlePress = () => {
        navigation.goBack();
        setCurrentFixture({});
    };

    return (
        <>
            <MyFixtureCard fixture={currentFixture} />
            <Text>The Team Sheet will go here...</Text>
            <Button onPress={handlePress}>Back</Button>
        </>
    );
}
