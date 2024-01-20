import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { FC, useCallback } from "react";
import { View } from "react-native";
import RncDateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  visible: boolean;
  date: Date;
  mode: "time" | "date";
};

export const DateTimePickerModal: FC<Props> = ({
  visible,
  onCancel,
  onConfirm,
  date,
  mode,
}) => {
  const onChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (event.type === "dismissed") {
        onCancel();
      }
      if (event.type === "set" && date) {
        onConfirm(date);
      }
    },
    [onConfirm, onCancel]
  );
  if (visible)
    return <RncDateTimePicker onChange={onChange} mode={mode} value={date} />;
  return null;
};
