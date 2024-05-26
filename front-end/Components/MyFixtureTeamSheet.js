import { Button, Text } from "react-native-paper";
import { useContext } from "react";
import { MyFixtureContext } from "../Contexts/MyFixtureContext";

export default function MyFixtureTeamSheet({ navigation }) {
    const { currentFixtureId, setCurrentFixtureId } =
        useContext(MyFixtureContext);

    const handlePress = () => {
        navigation.goBack();
        setCurrentFixtureId(null);
    };

    return (
        <>
            <Button onPress={handlePress}>Back</Button>
            <Text>
                This is the team sheet for the fixture with id: "
                {currentFixtureId}"!
            </Text>
        </>
    );
}
