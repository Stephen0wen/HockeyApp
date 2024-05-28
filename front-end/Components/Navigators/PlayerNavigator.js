import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomePage from "../Home/HomePage";
import ResultsPage from "../Results/ResultsPage";
import UpcomingPage from "../Upcoming/UpcomingPage";
import MyFixturesPage from "../MyFixtures/MyFixturesPage";
import { useTheme } from "react-native-paper";

export default function PlayerNavigator() {
    const theme = useTheme();

    const Tab = createMaterialBottomTabNavigator();
    return (
        <NavigationContainer theme={theme}>
            <Tab.Navigator
                initialRouteName="Home"
                activeColor={theme.colors.primary}
            >
                <Tab.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="home"
                                color={color}
                                size={30}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Results"
                    component={ResultsPage}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="scoreboard"
                                color={color}
                                size={30}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Upcoming"
                    component={UpcomingPage}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="calendar"
                                color={color}
                                size={30}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="My Fixtures"
                    component={MyFixturesPage}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="hockey-sticks"
                                color={color}
                                size={30}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
