import React, { FC } from "react";
import { AccessibilityRole } from "react-native";
import { List, Switch } from "react-native-paper";

interface Props {
  title: string;
  onPress: () => void;
  value: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
  /** @default switch */
  accessibilityRole?: AccessibilityRole;
}

const SettingsSwitchRow: FC<Props> = ({
  title,
  onPress,
  value,
  accessibilityLabel,
  accessibilityHint,
  disabled,
  accessibilityRole = "switch",
}) => {
  return (
    <List.Item
      title={title}
      titleStyle={{ paddingLeft: 16 }}
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
      //   double check accessibility (needs to say the current value!)
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      disabled={disabled}
    />
  );
};

export default SettingsSwitchRow;
