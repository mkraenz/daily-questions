import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { FC } from "react";
import { View } from "react-native";
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  useTheme,
} from "react-native-paper";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const WarningIcon: FC = () => {
  const theme = useTheme();
  return <FontAwesome name={"warning"} size={24} color={theme.colors.error} />;
};

const ImportHistoryConfirmationDialog: FC<Props> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>
          <WarningIcon /> Confirm Import <WarningIcon />
        </Dialog.Title>
        <Dialog.Content style={{ flexDirection: "row" }}>
          <Paragraph>
            Warning! This will permanently overwrite your current history. Do
            you really want to import the history from clipboard?
          </Paragraph>
        </Dialog.Content>
        <View style={{ flexDirection: "row-reverse" }}>
          <Dialog.Actions>
            <Button onPress={() => onConfirm()}>Confirm</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={() => onCancel()}>Cancel</Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
};

export default ImportHistoryConfirmationDialog;
