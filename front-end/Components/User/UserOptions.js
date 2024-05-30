import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Modal, Portal, useTheme } from "react-native-paper";
import UserLogOut from "./UserLogOut";
import UserDelete from "./UserDelete";
import UserUpdate from "./UserUpdate";
import UserView from "./UserView";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

export default function UserOptions({ visible, setVisible }) {
  const hideModal = () => setVisible(false);

  const { user, userRole, setUserRole } = useContext(UserContext);

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
    text: {
      color: theme.colors.primary,
      textAlign: "center",
      fontSize: 20,
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
              <UserUpdate user={user} />
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
