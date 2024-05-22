import { registerRootComponent } from "expo";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import App from "./App";
import { UserProvider } from "./Contexts/UserContext";

export default function Main() {
    const colorScheme = useColorScheme();

    const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

    return (
        <PaperProvider theme={theme}>
            <UserProvider>
                <App />
            </UserProvider>
        </PaperProvider>
    );
}

registerRootComponent(Main);
