import React, { FC, useState } from "react";
import { Checkbox } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { toggleDialogOpen } from "../accessibility/accessibility.slice";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import DevModeConfirmationDialog from "./DevModeConfirmationDialog";
import { setDevMode } from "./settings.slice";

const mapState = (state: RootState) => ({
  devMode: state.settings.devMode,
});
const mapDispatch = { setDevMode, toggleDialogOpen };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const DevModeSwitch: FC<PropsFromRedux> = ({
  devMode,
  setDevMode,
  toggleDialogOpen,
}) => {
  const [confirmationShown, showConfirmation] = useState(false);
  const { t } = useTranslation();
  const handlePress = () => {
    if (devMode) setDevMode(false);
    else {
      toggleDialogOpen();
      showConfirmation(true);
    }
  };
  const handleConfirm = () => {
    setDevMode(!devMode);
    showConfirmation(false);
    toggleDialogOpen();
  };

  return (
    <>
      <DevModeConfirmationDialog
        visible={confirmationShown}
        onCancel={() => {
          toggleDialogOpen();
          showConfirmation(false);
        }}
        onConfirm={handleConfirm}
      />
      <Checkbox.Item
        label={t("settings:enableDevMode")}
        status={devMode ? "checked" : "unchecked"}
        onPress={handlePress}
      />
    </>
  );
};

export default connector(DevModeSwitch);
