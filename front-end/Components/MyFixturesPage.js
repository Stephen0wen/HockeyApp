import { MyFixtureProvider } from "../Contexts/MyFixtureContext";
import MyFixtureTeamSheet from "./MyFixtureTeamSheet";
import MyFixturesList from "./MyFixturesList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function MyFixturesPage() {
    const Stack = createNativeStackNavigator();

    return (
        <MyFixtureProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="MyFixturesList"
                    component={MyFixturesList}
                />
                <Stack.Screen name="TeamSheet" component={MyFixtureTeamSheet} />
            </Stack.Navigator>
        </MyFixtureProvider>
    );
}
