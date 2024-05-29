import { Text, Surface, useTheme } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import LoadScreen from "./LoadScreen";
import { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import { getAllTeams, getAllUsers } from "../ApiRequests";
import DropDownPicker from "react-native-dropdown-picker";

export default function UserByTeamId() {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getAllTeams()
      .then((apiResults) => {
        setItems(apiResults);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [users, items]);

  if (isLoading) {
    return <LoadScreen message="Loading Users..." />;
  }

  const theme = useTheme();

  const styles = StyleSheet.create({
    surface: {
      width: 150,
      margin: 10,
      borderRadius: 20,
    },
    text: {
      color: theme.colors.primary,
      textAlign: "center",
    },
  });

  function selectTeamHandler(value) {
    getAllUsers(value).then((users) => {
      setUsers(users);
    });
  }

  return (
    <Surface style={styles.surface}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={() => {
          selectTeamHandler(value);
        }}
        placeholder="Choose your team"
      />

      <div>Users list:</div>
      {users.map((user) => {
        return <div>{user.user_id}</div>;
      })}
    </Surface>
  );
}
