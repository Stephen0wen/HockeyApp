import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Modal, Portal, useTheme } from "react-native-paper";
import UserLogOut from "./UserLogOut";
import UserDelete from "./UserDelete";
import UserUpdate from "./UserUpdate";
import UserView from "./UserView";
import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { UserDeletePopup } from "./UserDeletePopup";
import UserLogOutPopup from "./UserLogOutPopup";

export default function UserOptions({ visible, setVisible }) {
    const hideModal = () => setVisible(false);

    const { user, setUser, userRole, setUserRole } = useContext(UserContext);

    const theme = useTheme();

    const [visibleUserDelete, setVisibleUserDelete] = useState(false);
    const toggleModalUserDelete = () =>
        setVisibleUserDelete(!visibleUserDelete);

    const [visibleUserLogOff, setVisibleUserLogOff] = useState(false);
    const toggleModalUserLogOff = () =>
        setVisibleUserLogOff(!visibleUserLogOff);

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
            height: 680,
        },
        text: {
            textAlign: "center",
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
                <ScrollView>
                    <View style={styles.innerContainer}>
                        <View>
                            <Text style={styles.text}>
                                Welcome, {user.user_name}
                            </Text>
                            <UserView
                                user={user}
                                userRole={userRole}
                                setUserRole={setUserRole}
                            />
                            <UserUpdate user={user} />
                            <UserLogOut
                                toggleModalUserLogOff={toggleModalUserLogOff}
                            />
                        </View>

                        <UserDelete
                            toggleModalUserDelete={toggleModalUserDelete}
                        />
                    </View>
                </ScrollView>
                <View style={{ height: 50 }} />
            </Modal>
            <UserLogOutPopup
                visibleUserLogOff={visibleUserLogOff}
                toggleModalUserLogOff={toggleModalUserLogOff}
                user={user}
                setUser={setUser}
                setUserRole={setUserRole}
            />
            <UserDeletePopup
                visibleUserDelete={visibleUserDelete}
                toggleModalUserDelete={toggleModalUserDelete}
                user={user}
                setUser={setUser}
                setUserRole={setUserRole}
            />
        </Portal>
    );
}
