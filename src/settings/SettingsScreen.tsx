import React from "react";
import { View } from "react-native";
import BelatedDailiesTimePicker from "./BelatedDailiesTimePicker";
import DarkModeSwitch from "./DarkModeSwitch";
import DevModeSwitch from "./DevModeSwitch";
import ExportHistory from "./import-history/ExportHistory";
import ImportHistory from "./import-history/ImportHistory";
import LanguageSelect from "./LanguageSelect";
import NotificationSwitch from "./NotificationSwitch";
import NotificationTimePicker from "./NotificationTimePicker";
import ShowAppbarSwitch from "./ShowAppbarSwitch";
import UniteConfirmAndShareButtonsSwitch from "./UniteConfirmAndShareButtonsSwitch";
import VersionAndCopyright from "./VersionAndCopyright";

const SettingsScreen = () => {
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        padding: 20,
      }}
    >
      <VersionAndCopyright />
      <DarkModeSwitch />
      <ShowAppbarSwitch />
      <UniteConfirmAndShareButtonsSwitch />
      <DevModeSwitch />
      <NotificationSwitch />
      <NotificationTimePicker />
      <BelatedDailiesTimePicker />
      <LanguageSelect />
      <ExportHistory />
      <ImportHistory />
    </View>
  );
};

export default SettingsScreen;
