import moment from "moment";
import React, { FC, useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { setBelatedDailiesUntilNextDayAtHour } from "./settings.slice";

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
    <View style={{ marginBottom: 16 }}>
      <Button mode="outlined" onPress={() => showTimePicker(true)}>
        Start of next day: {toHHMM(date)}
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

export default connector(BelatedDailiesTimePicker);
