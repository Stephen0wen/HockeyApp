import { registerRootComponent } from "expo";
import { PaperProvider } from "react-native-paper";
import { StatusBar, View } from "react-native";
import { useColorScheme } from "react-native";
import App from "./App";
import { UserProvider } from "./Contexts/UserContext";
import darkTheme from "./assets/themes/darkTheme";
import lightTheme from "./assets/themes/lightTheme";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Main() {
    const colorScheme = useColorScheme();

    const theme = colorScheme === "dark" ? darkTheme : lightTheme;
    const statusBarStyle =
        colorScheme === "dark" ? "dark-content" : "light-content";

    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <UserProvider>
                    <StatusBar
                        backgroundColor={theme.colors.primary}
                        barStyle={statusBarStyle}
                    />
                    <App />
                </UserProvider>
            </PaperProvider>
        </SafeAreaProvider>
    );
}

registerRootComponent(Main);
