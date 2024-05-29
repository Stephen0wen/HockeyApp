import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Modal, Portal, useTheme } from "react-native-paper";
import UserLogOut from "./UserLogOut";
import UserDelete from "./UserDelete";
import UserUpdate from "./UserUpdate";
import UserView from "./UserView";
import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { UserDeletePopup } from "./UserDeletePopup";

export default function UserOptions({ visible, setVisible }) {
  const hideModal = () => setVisible(false);

  const { user, setUser, userRole, setUserRole } = useContext(UserContext);

  const theme = useTheme();

  const [visibleUserDelete, setVisibleUserDelete] = useState(false);
  const toggleModalUserDelete = () => setVisibleUserDelete(!visibleUserDelete);

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
              <Text style={styles.text}>Welcome, {user.user_name}</Text>
              <UserView
                user={user}
                userRole={userRole}
                setUserRole={setUserRole}
              />
              <UserUpdate />
              <UserLogOut />
            </View>
            <View style={{ height: 50 }}></View>
            <UserDelete toggleModalUserDelete={toggleModalUserDelete} />
          </View>
        </ScrollView>
      </Modal>
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
