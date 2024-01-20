import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating />
    </View>
  );
};

export default LoadingScreen;
