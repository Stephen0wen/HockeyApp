import { StyleSheet } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";

export default function UserOptions({ visible, setVisible }) {
    const hideModal = () => setVisible(false);

    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignSelf: "flex-end",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            width: 150,
            marginTop: 50,
            padding: 5,
            backgroundColor: theme.colors.secondaryContainer,
        },
    });

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.container}
                animationType="slide"
            >
                <Text variant="headlineMedium">Options</Text>
            </Modal>
        </Portal>
    );
}
