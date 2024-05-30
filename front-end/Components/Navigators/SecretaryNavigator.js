import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomePage from "../Home/HomePage";
// import SecretaryPage from "../User/Secretary/SecretaryPage";
import MyFixturesPage from "../MyFixtures/MyFixturesPage";
import { useTheme } from "react-native-paper";
import PostResults from "../Secretary/PostResults";
import PlayersPage from "../Players/PlayersPage";

export default function SecretaryNavigator() {
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
                {/* Resplace results with update fixtures */}
                <Tab.Screen
                    name="Results"
                    component={PostResults}
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
                <Tab.Screen
                    name="My Team"
                    component={PlayersPage}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="account-group"
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
