import React, { FC } from "react";
import { Checkbox } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { setUniteConfirmAndShareButtonsInDailies } from "./settings.slice";

const mapState = (state: RootState) => ({
  checked: state.settings.uniteConfirmAndShareButtonsInDailies,
});
const mapDispatch = { setUniteConfirmAndShareButtonsInDailies };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const UniteConfirmAndShareButtonsSwitch: FC<PropsFromRedux> = ({
  checked,
  setUniteConfirmAndShareButtonsInDailies,
}) => {
  return (
    <Checkbox.Item
      label="Unite Confirm and Share Buttons in Dailies' Summary"
      status={checked ? "checked" : "unchecked"}
      onPress={() => setUniteConfirmAndShareButtonsInDailies(!checked)}
    ></Checkbox.Item>
  );
};

export default connector(UniteConfirmAndShareButtonsSwitch);
