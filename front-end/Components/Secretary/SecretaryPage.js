import { StyleSheet, View } from "react-native";
import React from "react";
// import LoadScreen from "../../LoadScreen";
// import { useState, useEffect } from "react";
// import { getMyFixtures } from "../../../ApiRequests";
// import { Text } from "react-native-paper";
// import DropDownPicker from "react-native-dropdown-picker";

const SecretaryPage = () => {
    //   const [open, setOpen] = useState(false);
    //   const [isLoading, setIsLoading] = useState(true);
    //   const [user, setUser] = useState(null);

    //   useEffect(() => {
    //     setIsLoading(true);
    //     Promise.all(getMyFixtures(user.team_id))
    //       .then((apiMyFixtures) => {
    //         setMyFixtures(apiMyFixtures);
    //       })
    //       .then(() => {
    //         setIsLoading(false);
    //       });
    //   }, []);

    //   if (isLoading) {
    //     return <LoadScreen message="Loading your fixtures..." />;
    //   }

    return (
        <View>
            <Text>SecretaryPage</Text>
            {/* <ContactContainer>
        <Text>Contact details</Text>
        <DropDownPicker
          open={open}
          value={user}
          setOpen={setOpen}
          setValue={setUser}
          placeholder="Who are you looking for sucker?"
        />
        <Text>{user.user_name}</Text>
        <Text>{user.user_phone}</Text> <Text>{user.user_email}</Text>
      </ContactContainer>
      <PostResultsContainer>
        <Text>Post Results</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder={team2 + "score"}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder={team2 + "score"}
          keyboardType="numeric"
        />
      </PostResultsContainer> */}
        </View>
    );
};

export default SecretaryPage;

const styles = StyleSheet.create({});
