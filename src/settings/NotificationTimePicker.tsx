import moment from "moment";
import React, { FC, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import {
  DEFAULT_NOTIFICATION_HOUR,
  DEFAULT_NOTIFICATION_MINUTE,
} from "../LocalNotifications";
import { RootState } from "../store";
import { setNotificationTime } from "./settings.slice";
import SettingsButtonRow from "./SettingsButtonRow";
import { DateTimePickerModal } from "../common";

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
    showTimePicker(false); // must come first to avoid opening the datetime picker twice https://github.com/react-native-datetimepicker/datetimepicker/issues/54#issuecomment-1240496220
    setNotificationTime({
      enabled: true,
      hour: date.getHours(),
      minute: date.getMinutes(),
    });
  };

  const date = new Date();
  date.setHours(
    notificationSettings?.hour ?? DEFAULT_NOTIFICATION_HOUR,
    notificationSettings?.minute ?? DEFAULT_NOTIFICATION_MINUTE,
    0,
    0
  );
  return (
    <>
      <SettingsButtonRow
        value={toHHMM(date)}
        title={t("settings:notificationTime")}
        accessibilityLabel={t("settings:notificationTime")}
        accessibilityHint={t("settings:notificationTimeA11yHint")}
        disabled={!notificationSettings?.enabled}
        onPress={() => showTimePicker(true)}
      />
      <DateTimePickerModal
        visible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => showTimePicker(false)}
        date={date}
      />
    </>
  );
};

export default connector(NotificationTimePicker);
