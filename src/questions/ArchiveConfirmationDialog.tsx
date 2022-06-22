import * as React from "react";
import { FC } from "react";
import { View } from "react-native";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ArchiveConfirmationDialog: FC<Props> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>Confirm Archival</Dialog.Title>
        <Dialog.Content>
          {/* TODO explain how to revert archival */}
          <Paragraph>Do you really want to archive this question?</Paragraph>
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

export default ArchiveConfirmationDialog;
