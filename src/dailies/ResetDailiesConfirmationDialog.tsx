import * as React from "react";
import { FC } from "react";
import { View } from "react-native";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ResetDailiesConfirmationDialog: FC<Props> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>Confirm Reset</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Do you really want to reset today's dailies? Your history will be
            preserved.
          </Paragraph>
        </Dialog.Content>
        <View style={{ flexDirection: "row-reverse" }}>
          <Dialog.Actions>
            <Button onPress={onConfirm}>Confirm</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={onCancel}>Cancel</Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
};

export default ResetDailiesConfirmationDialog;
