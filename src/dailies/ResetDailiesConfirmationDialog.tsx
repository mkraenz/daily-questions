import * as React from "react";
import { FC } from "react";
import { View } from "react-native";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";

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
  const { t } = useTranslation();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{t("dailies:resetDialogHeader")}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{t("dailies:confirmResetDialogMessage")}</Paragraph>
        </Dialog.Content>
        <View style={{ flexDirection: "row-reverse" }}>
          <Dialog.Actions>
            <Button onPress={() => onConfirm()}>{t("dailies:confirm")}</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={() => onCancel()}>{t("dailies:cancel")}</Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
};

export default ResetDailiesConfirmationDialog;
