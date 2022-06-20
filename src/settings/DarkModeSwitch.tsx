import React, { FC } from "react";
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
  return (
    <Checkbox.Item
      label="Dark Mode"
      status={dark ? "checked" : "unchecked"}
      onPress={() => setDarkMode(!dark)}
    ></Checkbox.Item>
  );
};

export default connector(DarkModeSwitch);
