import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { toggleDialogOpen } from "../accessibility/accessibility.slice";
import { useTranslation } from "../localization/useTranslations";

export const timeSpans = [
  "last7days",
  "last30days",
  "last1year",
  "lifetime",
] as const;
export type TimeSpan = typeof timeSpans[number];

const mapDispatch = { toggleDialogOpen };
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

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

const TimeSpanSelector: FC<Props & PropsFromRedux> = ({
  timeSpan,
  setTimeSpan,
  toggleDialogOpen,
}) => {
  const [visible, setVisible] = React.useState(false);
  const { t } = useTranslation();

  const openMenu = () => {
    toggleDialogOpen();
    setVisible(true);
  };
  const closeMenu = () => {
    toggleDialogOpen();
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      overlayAccessibilityLabel={t("statistics:timeSpanSelectMenuA11yLabel")}
      anchor={
        <Button
          mode="contained"
          onPress={openMenu}
          style={styles.button}
          contentStyle={{ flexDirection: "row-reverse" }}
          icon="menu-down"
          accessibilityLabel={t("statistics:timeSpanSelectButtonA11yLabel", {
            timeSpan: t(`statistics:${timeSpan}`),
          })}
          accessibilityHint={t("statistics:timeSpanSelectButtonA11yHint")}
        >
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

export default connector(TimeSpanSelector);
