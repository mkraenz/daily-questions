import React, { FC } from "react";
import { View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { getAccessibilityHiddenProps } from "../accessibility/getAccessibilityHiddenProps";
import { RootState } from "../store";
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

const mapState = (state: RootState) => ({
  accessibilityHidden: state.accessibility.dialogOpen,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const SettingsScreen: FC<PropsFromRedux> = ({ accessibilityHidden }) => {
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        padding: 20,
      }}
      {...getAccessibilityHiddenProps(accessibilityHidden)}
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

export default connector(SettingsScreen);
