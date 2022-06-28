import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import ResetDailiesConfirmationDialog from "./ResetDailiesConfirmationDialog";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
});

const ResetDailiesBar: FC<{ onReset: () => void }> = ({ onReset }) => {
  const [confirmationShown, showConfirmation] = React.useState(false);
  return (
    <View style={styles.container}>
      <ResetDailiesConfirmationDialog
        visible={confirmationShown}
        onConfirm={onReset}
        onCancel={() => showConfirmation(false)}
      />
      <IconButton
        icon="restart"
        onPress={() => showConfirmation(true)}
      ></IconButton>
    </View>
  );
};

export default ResetDailiesBar;
