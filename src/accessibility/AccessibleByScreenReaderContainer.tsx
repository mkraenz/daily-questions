import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { getAccessibilityHiddenProps } from "./getAccessibilityHiddenProps";

const mapState = (state: RootState) => ({
  accessibilityHidden: state.accessibility.dialogOpen,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Hides the complete app component tree from screen readers,
 * except components within a Portal, e.g. Dialogs.
 * Dialogs should use toggleDialogOpen to enable and disable this behavior.
 */
const AccessibleByScreenReaderContainer: FC<PropsFromRedux> = (props) => {
  return (
    <View
      {...getAccessibilityHiddenProps(props.accessibilityHidden)}
      style={StyleSheet.absoluteFill}
    >
      {props.children}
    </View>
  );
};

export default connector(AccessibleByScreenReaderContainer);
