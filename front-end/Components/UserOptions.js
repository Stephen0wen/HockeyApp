import { ScrollView, StyleSheet, View } from "react-native";
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
        modal: {
            flex: 1,
            alignSelf: "flex-end",
            width: 180,
            marginTop: 50,

            backgroundColor: theme.colors.secondaryContainer,
        },
        innerContainer: {
            padding: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
        },
    });

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.modal}
                animationType="slide"
            >
                <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
                    <View style={styles.innerContainer}>
                        <View>
                            <UserView />
                            <UserUpdate />
                            <UserLogOut />
                        </View>
                        <View style={{ height: 50 }}></View>
                        <UserDelete />
                    </View>
                </ScrollView>
            </Modal>
        </Portal>
    );
}
