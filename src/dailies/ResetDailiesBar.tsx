import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { resetDailies } from "./dailies.slice";
import ResetDailiesConfirmationDialog from "./ResetDailiesConfirmationDialog";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
});

const mapDispatch = {
  resetDailies,
};
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ResetDailiesBar: FC<PropsFromRedux> = ({ resetDailies }) => {
  const [confirmationShown, showConfirmation] = React.useState(false);
  return (
    <View style={styles.container}>
      <ResetDailiesConfirmationDialog
        visible={confirmationShown}
        onConfirm={resetDailies}
        onCancel={() => showConfirmation(false)}
      />
      <IconButton
        icon="restart"
        onPress={() => showConfirmation(true)}
      ></IconButton>
    </View>
  );
};

export default connector(ResetDailiesBar);
