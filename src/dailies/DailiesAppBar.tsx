import { DrawerHeaderProps } from "@react-navigation/drawer";
import React, { FC } from "react";
import { Appbar } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import BaseAppBar from "../BaseAppBar";
import { resetDailies } from "./dailies.slice";
import ResetDailiesConfirmationDialog from "./ResetDailiesConfirmationDialog";

const mapDispatch = {
  resetDailies,
};
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const DailiesAppBar: FC<DrawerHeaderProps & PropsFromRedux> = (props) => {
  const [confirmationShown, showConfirmation] = React.useState(false);

  return (
    <BaseAppBar {...props}>
      <ResetDailiesConfirmationDialog
        visible={confirmationShown}
        onConfirm={() => {
          props.resetDailies();
          showConfirmation(false);
        }}
        onCancel={() => showConfirmation(false)}
      />
      <Appbar.Action icon="restart" onPress={() => showConfirmation(true)} />
    </BaseAppBar>
  );
};

export default connector(DailiesAppBar);
