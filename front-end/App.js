import React, { useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import Header from "./Components/Header/Header";
import { UserContext } from "./Contexts/UserContext";
import PublicNavigator from "./Components/Navigators/PublicNavigator";
import PlayerNavigator from "./Components/Navigators/PlayerNavigator";
import SecretaryNavigator from "./Components/Navigators/SecretaryNavigator";

export default function App() {
  const { userRole } = useContext(UserContext);
  const [navigator, setNavigator] = useState(<PublicNavigator />);

  const [fontsLoaded] = useFonts({
    Jaro: require("./assets/fonts/Jaro-Regular.ttf"),
  });

  useEffect(() => {
    if (userRole === "public") {
      setNavigator(<PublicNavigator />);
    }
    if (userRole === "player") {
      setNavigator(<PlayerNavigator />);
    }
    if (userRole === "secretary") {
      setNavigator(<SecretaryNavigator />);
    }
  }, [userRole]);


  return (
    <>
      <Header />
      {navigator}
      <StatusBar />
    </>
  );

    return (
        <>
            <Header />
            {navigator}
        </>
    );

}
