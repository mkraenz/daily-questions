import React, { FC } from "react";
import { Checkbox } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { showAppbarInDailies } from "./settings.slice";

const mapState = (state: RootState) => ({
  appbarShown: state.settings.appbarShownInDailies,
});
const mapDispatch = { showAppbarInDailies };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ShowAppBarSwitch: FC<PropsFromRedux> = ({
  appbarShown,
  showAppbarInDailies,
}) => {
  return (
    <Checkbox.Item
      label="Show App Bar in Dailies"
      status={appbarShown ? "checked" : "unchecked"}
      onPress={() => showAppbarInDailies(!appbarShown)}
    ></Checkbox.Item>
  );
};

export default connector(ShowAppBarSwitch);
