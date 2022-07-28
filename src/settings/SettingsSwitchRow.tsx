import React, { FC } from "react";
import { AccessibilityRole, StyleSheet } from "react-native";
import { List, Switch, useTheme } from "react-native-paper";

interface Props {
  title: string;
  description?: string;
  onPress: () => void;
  value: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
  /** @default switch */
  accessibilityRole?: AccessibilityRole;
}

const styles = StyleSheet.create({
  paddingLeft: {
    paddingLeft: 12,
  },
});

const SettingsSwitchRow: FC<Props> = ({
  title,
  description,
  onPress,
  value,
  accessibilityLabel,
  accessibilityHint,
  disabled,
  accessibilityRole = "switch",
}) => {
  const theme = useTheme();
  return (
    <List.Item
      title={title}
      titleStyle={{ paddingLeft: 12, color: theme.colors.text }}
      description={description}
      descriptionNumberOfLines={2}
      descriptionStyle={{ paddingLeft: 12 }}
      right={() => (
        // TODO double check whether accessible false works the way we expect
        <Switch
          onChange={onPress}
          value={value}
          accessible={false}
          disabled={disabled}
        />
      )}
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      // TODO double check accessibility (needs to say the current value!)
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      disabled={disabled}
    />
  );
};

export default SettingsSwitchRow;
