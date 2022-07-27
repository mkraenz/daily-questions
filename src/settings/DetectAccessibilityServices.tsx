import { FC, useEffect } from "react";
import {
  AccessibilityChangeEventHandler,
  AccessibilityInfo,
} from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { setScreenReaderEnabled } from "./accessibility.slice";
import { showAppbarInDailies } from "./settings.slice";

const mapDispatch = { setScreenReaderEnabled, showAppbarInDailies };
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

/** @see https://docs.expo.dev/versions/latest/react-native/accessibilityinfo/ */
const DetectAccessabilityServices: FC<PropsFromRedux> = ({
  setScreenReaderEnabled,
  showAppbarInDailies,
}) => {
  useEffect(() => {
    console.log("DetectAccessabilityServices useEffect");
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
    console.log("handleScreenReaderToggled", enabled);

    setScreenReaderEnabled(enabled);
    if (enabled) showAppbarInDailies(true); // only set to true for screen reader users
  };

  return null;
};
export default connector(DetectAccessabilityServices);
