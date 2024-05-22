import { Modal, Portal, Text, useTheme } from "react-native-paper";

export default function UserOptions({ visible, setVisible }) {
    const hideModal = () => setVisible(false);

    const theme = useTheme();

    const containerStyle = {
        backgroundColor: theme.colors.primaryContainer,
        padding: 20,
        width: "auto",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10%",
        marginRight: "10%",
        display: "flex",
    };

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
                animationType="slide"
            >
                <Text>Hello</Text>
            </Modal>
        </Portal>
    );
}
