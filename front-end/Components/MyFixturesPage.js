import MyFixturesList from "./MyFixturesList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function MyFixturesPage() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyFixturesList" component={MyFixturesList} />
        </Stack.Navigator>
    );
}
