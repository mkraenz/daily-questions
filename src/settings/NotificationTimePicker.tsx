import moment from "moment";
import React, { FC, useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import {
  DEFAULT_NOTIFICATION_HOUR,
  DEFAULT_NOTIFICATION_MINUTE,
} from "../LocalNotifications";
import { RootState } from "../store";
import { setNotificationTime } from "./settings.slice";

const mapState = (state: RootState) => ({
  notificationSettings: state.settings.notifications,
});
const mapDispatch = { setNotificationTime };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const toHHMM = (date: Date) => {
  const momentDate = moment(date);
  return momentDate.format("hh:mm A");
};

const NotificationTimePicker: FC<PropsFromRedux> = ({
  notificationSettings,
  setNotificationTime,
}) => {
  const [isDatePickerVisible, showTimePicker] = useState(false);
  const { t } = useTranslation();

  const handleConfirm = (date: Date) => {
    setNotificationTime({
      enabled: true,
      hour: date.getHours(),
      minute: date.getMinutes(),
    });
    showTimePicker(false);
  };

  const date = new Date();
  date.setHours(
    notificationSettings?.hour ?? DEFAULT_NOTIFICATION_HOUR,
    notificationSettings?.minute ?? DEFAULT_NOTIFICATION_MINUTE,
    0,
    0
  );
  return (
    <View style={{ marginBottom: 16 }}>
      <Button
        mode="outlined"
        onPress={() => showTimePicker(true)}
        disabled={!notificationSettings?.enabled}
      >
        {t("settings:notificationTime", { time: toHHMM(date) })}
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => showTimePicker(false)}
        date={date}
      />
    </View>
  );
};

export default connector(NotificationTimePicker);
