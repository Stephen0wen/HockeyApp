import { StatusBar } from "expo-status-bar";
import React from "react";
import { useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomePage from "./Components/HomePage";

export default function App() {
    const theme = useTheme();
    const Tab = createMaterialBottomTabNavigator();

    return (
        <>
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
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar />
        </>
    );
}
