import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import BelatedDailiesTimePicker from "./BelatedDailiesTimePicker";
import DarkModeSwitch from "./DarkModeSwitch";
import DevModeDropDownMenu from "./DevModeDropdown";
import ExportHistory from "./ExportHistory";
import ImportHistory from "./ImportHistory";
import ShowAppbarSwitch from "./ShowAppbarSwitch";
import VersionAndCopyright from "./VersionAndCopyright";

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
      <DarkModeSwitch />
      <ShowAppbarSwitch />
      <BelatedDailiesTimePicker />
      <DevModeDropDownMenu />
      <ExportHistory />
      <ImportHistory />
    </View>
  );
};

export default SettingsScreen;
