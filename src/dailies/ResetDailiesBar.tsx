import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { toggleDialogOpen } from "../accessibility/accessibility.slice";
import { useTranslation } from "../localization/useTranslations";
import { resetDailies } from "./dailies.slice";
import ResetDailiesConfirmationDialog from "./ResetDailiesConfirmationDialog";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
});

const mapDispatch = {
  resetDailies,
  toggleDialogOpen,
};
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ResetDailiesBar: FC<PropsFromRedux> = ({
  resetDailies,
  toggleDialogOpen,
}) => {
  const [confirmationShown, showConfirmation] = React.useState(false);
  const { t } = useTranslation();
  const show = () => {
    toggleDialogOpen();
    showConfirmation(true);
  };
  const hide = () => {
    toggleDialogOpen();
    showConfirmation(false);
  };
  return (
    <View style={styles.container}>
      <ResetDailiesConfirmationDialog
        visible={confirmationShown}
        onConfirm={resetDailies}
        onCancel={hide}
      />
      <IconButton
        icon="restart"
        onPress={show}
        accessibilityLabel={t("dailies:resetButtonAllyLabel")}
        accessibilityHint={t("dailies:resetButtonAllyHint")}
      ></IconButton>
    </View>
  );
};

export default connector(ResetDailiesBar);
