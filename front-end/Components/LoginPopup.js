import { Modal, Portal, Text } from "react-native-paper";

export default function LoginPopup({ visible, setVisible }) {
    const hideModal = () => setVisible(false);

    const containerStyle = { backgroundColor: "white", padding: 20 };

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
            >
                <Text>Login Goes Here</Text>
            </Modal>
        </Portal>
    );
}
