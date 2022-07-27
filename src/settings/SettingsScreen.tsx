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
import ShowPointsQuestionInputPlaceholderSwitch from "./ShowPointsQuestionInputPlaceholderSwitch";
import UniteConfirmAndShareButtonsSwitch from "./UniteConfirmAndShareButtonsSwitch";

const SettingsScreen = () => {
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        padding: 20,
      }}
    >
      <DarkModeSwitch />
      <ShowAppbarSwitch />
      <ShowPointsQuestionInputPlaceholderSwitch />
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
