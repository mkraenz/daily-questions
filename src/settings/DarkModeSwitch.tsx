import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { setDarkMode } from "./settings.slice";

const mapState = (state: RootState) => ({
  dark: state.settings.darkMode,
});
const mapDispatch = { setDarkMode };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const DarkModeSwitch: FC<PropsFromRedux> = ({ dark, setDarkMode }) => {
  const { t } = useTranslation();
  return (
    <Checkbox.Item
      label={t("darkMode")}
      status={dark ? "checked" : "unchecked"}
      onPress={() => setDarkMode(!dark)}
    ></Checkbox.Item>
  );
};

export default connector(DarkModeSwitch);
