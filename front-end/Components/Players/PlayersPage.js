import { Card, Surface, useTheme, Text } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import LoadScreen from "../LoadScreen";
import { useState, useEffect, useContext } from "react";
import { getAllPlayers } from "../../ApiRequests";
import { UserContext } from "../../Contexts/UserContext";
import PlayerCard from "./PlayerCard";

export default function PlayersPage() {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(UserContext);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getAllPlayers()
            .then((apiPlayers) => {
                const filteredPlayers = apiPlayers.filter((player) => {
                    return player.team_id === user.team_id;
                });
                setPlayers(filteredPlayers);
            })
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <LoadScreen message="Loading Players..." />;
    }

    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: "center",
                gap: 5,
                padding: 10,
            }}
        >
            {players.map((player) => {
                return <PlayerCard key={player.user_id} player={player} />;
            })}
        </ScrollView>
    );
}
