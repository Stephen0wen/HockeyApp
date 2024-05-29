import { MyFixtureProvider } from "../../Contexts/MyFixtureContext";
import UpcomingList from "./UpcomingList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VenueMap from "../MyFixtures/VenueMap";

export default function MyFixturesPage() {
    const Stack = createNativeStackNavigator();

    return (
        <MyFixtureProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="UpcomingList" component={UpcomingList} />
                <Stack.Screen name="Details" component={VenueMap} />
            </Stack.Navigator>
        </MyFixtureProvider>
    );
}
