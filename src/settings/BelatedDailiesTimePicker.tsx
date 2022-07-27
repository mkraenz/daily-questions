import moment from "moment";
import React, { FC, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { setBelatedDailiesUntilNextDayAtHour } from "./settings.slice";
import SettingsButtonRow from "./SettingsButtonRow";

const mapState = (state: RootState) => ({
  time: state.settings.belatedDailiesUntilNextDayAt,
});
const mapDispatch = { setBelatedDailiesUntilNextDayAtHour };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const toHHMM = (date: Date) => {
  const momentDate = moment(date);
  return momentDate.format("hh:mm A");
};

const BelatedDailiesTimePicker: FC<PropsFromRedux> = ({
  time,
  setBelatedDailiesUntilNextDayAtHour,
}) => {
  const [isDatePickerVisible, showTimePicker] = useState(false);
  const { t } = useTranslation();

  const handleConfirm = (date: Date) => {
    setBelatedDailiesUntilNextDayAtHour({
      hour: date.getHours(),
      minute: date.getMinutes(),
    });
    showTimePicker(false);
  };

  const date = new Date();
  date.setHours(time.hour, time.minute, 0, 0);
  return (
    <>
      <SettingsButtonRow
        value={toHHMM(date)}
        title={t("settings:startOfNextDay")}
        accessibilityLabel={t("settings:startOfNextDay")}
        accessibilityHint={t("settings:startOfNextDayA11yHint")}
        onPress={() => showTimePicker(true)}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => showTimePicker(false)}
        date={date}
      />
    </>
  );
};

export default connector(BelatedDailiesTimePicker);
