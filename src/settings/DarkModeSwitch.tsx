import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { setDarkMode } from "./settings.slice";
import SettingsSwitchRow from "./SettingsSwitchRow";

const mapState = (state: RootState) => ({
  dark: state.settings.darkMode,
});
const mapDispatch = { setDarkMode };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const DarkModeSwitch: FC<PropsFromRedux> = ({ dark, setDarkMode }) => {
  const { t } = useTranslation();
  return (
    <SettingsSwitchRow
      title={t("settings:darkMode")}
      accessibilityLabel={t("settings:darkMode")}
      accessibilityHint={t("settings:darkModeA11yHint")}
      onPress={() => setDarkMode(!dark)}
      value={!!dark}
    />
  );
};

export default connector(DarkModeSwitch);
