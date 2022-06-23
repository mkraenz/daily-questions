import React, { FC } from "react";
import { Snackbar } from "react-native-paper";

interface Props {
  visible: boolean;
  onDismiss: () => void;
}
// TODO wouldnt it be better to show this as soon as we change (add, archive, move) the questions in the questions list?
const ForcedResetInfo: FC<Props> = ({ visible, onDismiss }) => {
  return (
    <Snackbar
      duration={10000}
      visible={visible}
      onDismiss={onDismiss}
      action={{
        label: "Got it!",
        onPress: onDismiss,
      }}
    >
      Your ongoing dailies have been reset.
    </Snackbar>
  );
};

export default ForcedResetInfo;
