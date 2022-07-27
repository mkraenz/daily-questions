import React, { FC } from "react";
import { Checkbox } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { showAppbarInDailies } from "./settings.slice";

const mapState = (state: RootState) => ({
  appbarShown: state.settings.appbarShownInDailies,
  screenReaderEnabled: state.accessibility.screenReaderEnabled,
});
const mapDispatch = { showAppbarInDailies };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ShowAppBarSwitch: FC<PropsFromRedux> = ({
  appbarShown,
  showAppbarInDailies,
  screenReaderEnabled,
}) => {
  const { t } = useTranslation();
  return (
    <Checkbox.Item
      disabled={screenReaderEnabled}
      label={t("settings:showAppbar")}
      status={appbarShown ? "checked" : "unchecked"}
      onPress={() => showAppbarInDailies(!appbarShown)}
    ></Checkbox.Item>
  );
};

export default connector(ShowAppBarSwitch);
