import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { Portal, Snackbar, useTheme } from "react-native-paper";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  text: string;
}

const SuccessMessage: FC<Props> = ({ visible, onDismiss, text }) => {
  const theme = useTheme();
  return (
    <Portal>
      {/* Snackbar wrapped in Portal to display absolutely positioned */}
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        action={{
          label: "OK",
          onPress: onDismiss,
        }}
      >
        <FontAwesome
          name="info-circle"
          size={20}
          color={theme.colors.primary}
        />{" "}
        {text}
      </Snackbar>
    </Portal>
  );
};

export default SuccessMessage;
