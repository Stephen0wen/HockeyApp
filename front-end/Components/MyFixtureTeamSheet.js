import { Button, Text } from "react-native-paper";

export default function MyFixtureTeamSheet({ navigation }) {
    return (
        <>
            <Button onPress={() => navigation.goBack()}>Back</Button>
            <Text>This is a team sheet!</Text>
        </>
    );
}
