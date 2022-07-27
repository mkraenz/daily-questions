import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { showAppbarInDailies } from "./settings.slice";
import SettingsSwitchRow from "./SettingsSwitchRow";

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
    <SettingsSwitchRow
      disabled={screenReaderEnabled}
      title={t("settings:showAppbar")}
      accessibilityLabel={t("settings:showAppbar")}
      accessibilityHint={t("settings:showAppbarA11yHint")}
      value={appbarShown}
      onPress={() => showAppbarInDailies(!appbarShown)}
    />
  );
};

export default connector(ShowAppBarSwitch);
