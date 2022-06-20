import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import DarkModeSwitch from "../settings/DarkModeSwitch";
import DevModeDropDownMenu from "../settings/DevModeDropdown";
import VersionAndCopyright from "../settings/VersionAndCopyright";

const SettingsScreen = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        display: "flex",
        height: "100%",
        padding: 20,
      }}
    >
      <Text>Daily Questions App</Text>
      <VersionAndCopyright />
      <DevModeDropDownMenu />
      <DarkModeSwitch />
    </View>
  );
};

export default SettingsScreen;
