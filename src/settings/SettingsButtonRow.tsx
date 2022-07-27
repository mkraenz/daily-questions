import React, { FC } from "react";
import { AccessibilityRole } from "react-native";
import { List, Text, useTheme } from "react-native-paper";

interface Props {
  title: string;
  onPress: () => void;
  value?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
  /** @default button */
  accessibilityRole?: AccessibilityRole;
}

const SettingsButtonRow: FC<Props> = ({
  title,
  onPress,
  value,
  accessibilityLabel,
  accessibilityHint,
  disabled,
  accessibilityRole = "button",
}) => {
  const theme = useTheme();
  return (
    <List.Item
      title={title}
      titleStyle={{ color: theme.colors.text, paddingLeft: 16 }}
      right={
        value !== undefined
          ? () => (
              // TODO double check whether accessible false works the way we expect
              <Text style={{ textAlignVertical: "center" }}>{value}</Text>
            )
          : undefined
      }
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      //   double check accessibility (needs to say the current value!)
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      disabled={disabled}
    />
  );
};

export default SettingsButtonRow;
