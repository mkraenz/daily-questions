import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { Portal, Snackbar, useTheme } from "react-native-paper";

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

const ImportHistorySuccessMessage: FC<Props> = ({ visible, onDismiss }) => {
  const theme = useTheme();
  return (
    <Portal>
      {/* Snackbar wrapped in Portal to display absolutely positioned */}
      <Snackbar visible={visible} onDismiss={onDismiss}>
        <FontAwesome
          name="info-circle"
          size={20}
          color={theme.colors.primary}
        />{" "}
        History imported successfully
      </Snackbar>
    </Portal>
  );
};

export default ImportHistorySuccessMessage;
