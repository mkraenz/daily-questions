import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const About = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100%",
      }}
    >
      <Text>Daily Questions App</Text>
      <Text>v1.2.0</Text>
    </View>
  );
};

export default About;
