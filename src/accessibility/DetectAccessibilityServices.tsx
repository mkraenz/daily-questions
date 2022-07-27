import { FC, useEffect } from "react";
import {
  AccessibilityChangeEventHandler,
  AccessibilityInfo,
} from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { showAppbarInDailies } from "../settings/settings.slice";
import { setScreenReaderEnabled } from "./accessibility.slice";

const mapDispatch = { setScreenReaderEnabled, showAppbarInDailies };
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

/** @see https://docs.expo.dev/versions/latest/react-native/accessibilityinfo/ */
const DetectAccessabilityServices: FC<PropsFromRedux> = ({
  setScreenReaderEnabled,
  showAppbarInDailies,
}) => {
  useEffect(() => {
    const screenReaderChangedListener = AccessibilityInfo.addEventListener(
      "screenReaderChanged",
      handleScreenReaderToggled
    );

    AccessibilityInfo.isScreenReaderEnabled().then((screenReaderEnabled) => {
      handleScreenReaderToggled(screenReaderEnabled);
    });

    return () => {
      screenReaderChangedListener.remove();
    };
  }, []);

  const handleScreenReaderToggled: AccessibilityChangeEventHandler = (
    enabled
  ) => {
    setScreenReaderEnabled(enabled);
    if (enabled) showAppbarInDailies(true); // only set to true for screen reader users
  };

  return null;
};
export default connector(DetectAccessabilityServices);
