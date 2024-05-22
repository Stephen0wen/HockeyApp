import { ScrollView, StyleSheet, View } from "react-native";
import { Modal, Portal, useTheme } from "react-native-paper";
import UserLogOut from "./UserLogOut";
import UserDelete from "./UserDelete";
import UserUpdate from "./UserUpdate";
import UserView from "./UserView";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

export default function UserOptions({ visible, setVisible }) {
    const hideModal = () => setVisible(false);

    const { userRole, setUserRole } = useContext(UserContext);

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
                            <UserView
                                userRole={userRole}
                                setUserRole={setUserRole}
                            />
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
