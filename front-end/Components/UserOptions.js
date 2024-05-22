import { StyleSheet, View } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
import LogOut from "./UserLogOut";
import UserLogOut from "./UserLogOut";
import UserDelete from "./UserDelete";
import UserUpdate from "./UserUpdate";
import UserView from "./UserView";

export default function UserOptions({ visible, setVisible }) {
    const hideModal = () => setVisible(false);

    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignSelf: "flex-end",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: 180,
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
                <View>
                    <UserView />
                    <UserUpdate />
                    <UserLogOut />
                </View>
                <UserDelete />
            </Modal>
        </Portal>
    );
}
