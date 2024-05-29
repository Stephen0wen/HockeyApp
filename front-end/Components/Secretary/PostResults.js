import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PostResults = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Placeholder</Text>
    </View>
  );
};

export default PostResults;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgreen",
    padding: 20,
  },
  text: {
    color: "purple",
    fontSize: 24,
    fontWeight: "bold",
  },
});
