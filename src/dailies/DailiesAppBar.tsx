import { DrawerHeaderProps } from "@react-navigation/drawer";
import React, { FC } from "react";
import { Appbar } from "react-native-paper";
import { connect, ConnectedProps, useSelector } from "react-redux";
import { toggleDialogOpen } from "../accessibility/accessibility.slice";
import BaseAppBar from "../BaseAppBar";
import { useTranslation } from "../localization/useTranslations";
import { selectIsEmptyActiveQuestions } from "../questions/questions.selectors";
import { RootState } from "../store";
import { resetDailies } from "./dailies.slice";
import ResetDailiesConfirmationDialog from "./ResetDailiesConfirmationDialog";

const mapState = (state: RootState) => ({
  dialogOpen: state.accessibility.dialogOpen,
});
const mapDispatch = {
  resetDailies,
  toggleDialogOpen,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const DailiesAppBar: FC<DrawerHeaderProps & PropsFromRedux> = (props) => {
  const { t } = useTranslation();
  const [confirmationShown, showConfirmation] = React.useState(false);
  const activeQuestionsEmpty = useSelector(selectIsEmptyActiveQuestions);

  return (
    <BaseAppBar {...props}>
      <ResetDailiesConfirmationDialog
        visible={confirmationShown}
        onConfirm={() => {
          props.resetDailies();
          showConfirmation(false);
          props.toggleDialogOpen();
        }}
        onCancel={() => {
          showConfirmation(false);
          props.toggleDialogOpen();
        }}
      />
      {!activeQuestionsEmpty && (
        <Appbar.Action
          icon="restart"
          onPress={() => {
            props.toggleDialogOpen();
            showConfirmation(true);
          }}
          accessibilityRole="button"
          accessibilityLabel={t("dailies:resetButtonAllyLabel")}
          accessibilityHint={t("dailies:resetButtonAllyHint")}
        />
      )}
    </BaseAppBar>
  );
};

export default connector(DailiesAppBar);
