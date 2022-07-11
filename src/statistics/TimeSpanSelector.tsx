import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";

export const timeSpans = [
  "last7days",
  "last30days",
  "last1year",
  "lifetime",
] as const;
export type TimeSpan = typeof timeSpans[number];

interface Props {
  timeSpan: TimeSpan;
  setTimeSpan: (timeSpan: TimeSpan) => void;
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 12,
    minWidth: "50%",
  },
});

const TimeSpanSelector: FC<Props> = ({ timeSpan, setTimeSpan }) => {
  const [visible, setVisible] = React.useState(false);
  const { t } = useTranslation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button mode="contained" onPress={openMenu} style={styles.button}>
          {t(`statistics:${timeSpan}`)}
        </Button>
      }
    >
      {timeSpans.map((timeSpan) => (
        <Menu.Item
          key={timeSpan}
          title={t(`statistics:${timeSpan}`)}
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
