import React, { FC } from "react";
import { AccessibilityRole, StyleSheet } from "react-native";
import { List, MD2Theme, Text, useTheme } from "react-native-paper";

interface Props {
  title: string;
  description?: string;
  onPress: () => void;
  value?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
  /** @default button */
  accessibilityRole?: AccessibilityRole;
}

const styles = StyleSheet.create({
  paddingLeft: {
    paddingLeft: 12,
  },
});

const SettingsButtonRow: FC<Props> = ({
  title,
  description,
  onPress,
  value,
  accessibilityLabel,
  accessibilityHint,
  disabled,
  accessibilityRole = "button",
}) => {
  const theme = useTheme<MD2Theme>();
  const textColor = disabled ? theme.colors.disabled : theme.colors.text;
  return (
    <List.Item
      title={title}
      titleStyle={[styles.paddingLeft, { color: textColor }]}
      description={description}
      descriptionStyle={styles.paddingLeft}
      right={
        value !== undefined
          ? () => (
              <Text style={{ textAlignVertical: "center", color: textColor }}>
                {value}
              </Text>
            )
          : undefined
      }
      onPress={() => onPress()}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      disabled={disabled}
      accessibilityValue={{ text: value }}
    />
  );
};

export default SettingsButtonRow;
