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
import { useTranslation } from "../localization/useTranslations";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const WarningIcon: FC = () => {
  const theme = useTheme();
  return <FontAwesome name={"warning"} size={24} color={theme.colors.error} />;
};

const DevModeConfirmationDialog: FC<Props> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title accessibilityRole="header">
          <WarningIcon /> {t("settings:devModeDialogTitle")}
        </Dialog.Title>
        <Dialog.Content style={{ flexDirection: "row" }}>
          <Paragraph>{t("settings:devModeDialogDescription")}</Paragraph>
        </Dialog.Content>
        <View style={{ flexDirection: "row-reverse" }}>
          <Dialog.Actions>
            <Button onPress={() => onConfirm()}>{t("general:confirm")}</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={() => onCancel()}>{t("general:cancel")}</Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
};

export default DevModeConfirmationDialog;
