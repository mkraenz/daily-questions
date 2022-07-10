import React from "react";
import { View } from "react-native";
import { Paragraph } from "react-native-paper";
import BelatedDailiesTimePicker from "./BelatedDailiesTimePicker";
import DarkModeSwitch from "./DarkModeSwitch";
import DevModeDropDownMenu from "./DevModeDropdown";
import ExportHistory from "./import-history/ExportHistory";
import ImportHistory from "./import-history/ImportHistory";
import ShowAppbarSwitch from "./ShowAppbarSwitch";
import UniteConfirmAndShareButtonsSwitch from "./UniteConfirmAndShareButtonsSwitch";
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
      <Paragraph>Daily Questions App</Paragraph>
      <VersionAndCopyright />
      <DarkModeSwitch />
      <ShowAppbarSwitch />
      <UniteConfirmAndShareButtonsSwitch />
      <BelatedDailiesTimePicker />
      <DevModeDropDownMenu />
      <ExportHistory />
      <ImportHistory />
    </View>
  );
};

export default SettingsScreen;
