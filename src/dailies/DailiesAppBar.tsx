import { DrawerHeaderProps } from "@react-navigation/drawer";
import React, { FC } from "react";
import { Appbar } from "react-native-paper";
import { connect, ConnectedProps, useSelector } from "react-redux";
import BaseAppBar from "../BaseAppBar";
import { useTranslation } from "../localization/useTranslations";
import { selectIsEmptyActiveQuestions } from "../questions/questions.selectors";
import { resetDailies } from "./dailies.slice";
import ResetDailiesConfirmationDialog from "./ResetDailiesConfirmationDialog";

const mapDispatch = {
  resetDailies,
};
const connector = connect(null, mapDispatch);
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
        }}
        onCancel={() => showConfirmation(false)}
      />
      {!activeQuestionsEmpty && (
        <Appbar.Action
          icon="restart"
          onPress={() => showConfirmation(true)}
          accessibilityRole="button"
          accessibilityLabel={t("dailies:resetButtonAllyLabel")}
          accessibilityHint={t("dailies:resetButtonAllyHint")}
        />
      )}
    </BaseAppBar>
  );
};

export default connector(DailiesAppBar);
