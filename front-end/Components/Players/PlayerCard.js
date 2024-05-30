import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function PlayerCard({ player }) {
    return (
        <Card mode="contained" style={styles.card}>
            <Card.Content style={styles.cardContent}>
                <Text variant="headlineSmall">{player.user_name}</Text>
                <View style={styles.itemContainer}>
                    <Text variant="bodyMedium" style={styles.label}>
                        Phone:
                    </Text>
                    <Text variant="bodyMedium" style={styles.info}>
                        {player.user_phone}
                    </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text variant="bodyMedium" style={styles.label}>
                        Email:
                    </Text>
                    <Text variant="bodyMedium" style={styles.info}>
                        {player.user_email}
                    </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text variant="bodyMedium" style={styles.label}>
                        Address:
                    </Text>
                    <View>
                        <Text variant="bodyMedium" style={styles.info}>
                            {player.user_address_1}
                        </Text>
                        <Text variant="bodyMedium" style={styles.info}>
                            {player.user_address_2}
                        </Text>
                        <Text variant="bodyMedium" style={styles.info}>
                            {player.user_postcode}
                        </Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        maxWidth: 300,
        width: "100%",
        padding: 5,
    },
    cardContent: {
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    name: {
        width: "100%",
        textAlign: "left",
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: 250,
    },
    label: {
        width: 60,
        textAlign: "right",
    },
    info: {
        width: 180,
    },
});
