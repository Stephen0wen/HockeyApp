import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import { useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import HomePage from "./Components/HomePage";
import ResultsPage from "./Components/ResultsPage";
import UpcomingPage from "./Components/UpcomingPage";
import MyFixturesPage from "./Components/MyFixturesPage";
import Header from "./Components/Header";
import { UserContext } from "./Contexts/UserContext";

export default function App() {
    const { userRole } = useContext(UserContext);
    const theme = useTheme();
    const Tab = createMaterialBottomTabNavigator();
    const [fontsLoaded] = useFonts({
        Jaro: require("./assets/fonts/Jaro-Regular.ttf"),
    });

    return (
        <>
            <Header />
            <NavigationContainer>
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
                        name="Fixtures"
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
            <StatusBar />
        </>
    );
}
