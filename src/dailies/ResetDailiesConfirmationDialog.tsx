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
        <Dialog.Title accessibilityRole="header">
          {t("dailies:resetDialogHeader")}
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph>{t("dailies:confirmResetDialogMessage")}</Paragraph>
        </Dialog.Content>
        <View style={{ flexDirection: "row-reverse" }}>
          <Dialog.Actions>
            <Button
              accessibilityLabel={t("general:confirm")}
              accessibilityHint={t(
                "dailies:confirmResetDialogConfirmButtonA11yHint"
              )}
              onPress={() => onConfirm()}
            >
              {t("general:confirm")}
            </Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={() => onCancel()}>{t("general:cancel")}</Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
};

export default ResetDailiesConfirmationDialog;
