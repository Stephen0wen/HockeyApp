import { StyleSheet, Text, View } from "react-native";
import React from "react";

// import { MyFixtureProvider } from "../../Contexts/MyFixtureContext";
// import MyFixturesList from "./MyFixturesList";

export default function PostResults() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hiya</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
