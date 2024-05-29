import { registerRootComponent } from "expo";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import App from "./App";
import { UserProvider } from "./Contexts/UserContext";
import darkTheme from "./assets/themes/darkTheme";
import lightTheme from "./assets/themes/lightTheme";

export default function Main() {
    const colorScheme = useColorScheme();

    const theme = colorScheme === "dark" ? darkTheme : lightTheme;

    return (
        <PaperProvider theme={theme}>
            <UserProvider>
                <App />
            </UserProvider>
        </PaperProvider>
    );
}

registerRootComponent(Main);
