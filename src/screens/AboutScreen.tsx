import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import DevModeDropDownMenu from "../settings/DevModeDropdown";
import VersionAndCopyright from "../settings/VersionAndCopyright";

const About = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        display: "flex",
        height: "100%",
        margin: 20,
      }}
    >
      <Text>Daily Questions App</Text>
      <VersionAndCopyright />
      <DevModeDropDownMenu />
    </View>
  );
};

export default About;
