import { registerRootComponent } from "expo";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import App from "./App";

export default function Main() {
    const colorScheme = useColorScheme();

    const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
}

registerRootComponent(Main);
