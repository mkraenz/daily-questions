import React, { FC } from "react";
import { Button, Menu } from "react-native-paper";

export const timeSpans = [
  "last 7 days",
  "last 30 days",
  "last 1 year",
  "lifetime",
] as const;
export type TimeSpan = typeof timeSpans[number];

interface Props {
  timeSpan: TimeSpan;
  setTimeSpan: (timeSpan: TimeSpan) => void;
}

const TimeSpanSelector: FC<Props> = ({ timeSpan, setTimeSpan }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button mode="outlined" onPress={openMenu}>
          {timeSpan}
        </Button>
      }
    >
      {timeSpans.map((timeSpan) => (
        <Menu.Item
          key={timeSpan}
          title={timeSpan}
          onPress={() => {
            setTimeSpan(timeSpan);
            closeMenu();
          }}
        />
      ))}
    </Menu>
  );
};

export default TimeSpanSelector;
