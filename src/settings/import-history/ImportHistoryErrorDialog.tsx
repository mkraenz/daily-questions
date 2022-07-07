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
  onDismiss: () => void;
}

const WarningIcon: FC = () => {
  const theme = useTheme();
  return <FontAwesome name={"warning"} size={24} color={theme.colors.accent} />;
};

const ImportHistoryErrorDialog: FC<Props> = ({ visible, onDismiss }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>
          <WarningIcon /> Import Failed <WarningIcon />
        </Dialog.Title>
        <Dialog.Content style={{ flexDirection: "row" }}>
          <Paragraph>
            Importing history from clipboard failed. Please make sure you copied
            history string is valid. Your existing history was NOT changed.
          </Paragraph>
        </Dialog.Content>
        <View style={{ flexDirection: "row-reverse" }}>
          <Dialog.Actions>
            <Button onPress={() => onDismiss()}>OK</Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
};

export default ImportHistoryErrorDialog;
