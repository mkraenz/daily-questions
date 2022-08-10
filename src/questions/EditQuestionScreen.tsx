import { useNavigation } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { toggleDialogOpen } from "../accessibility/accessibility.slice";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import ArchiveConfirmationDialog from "./ArchiveConfirmationDialog";
import type {
  QuestionsNavigationProp,
  QuestionsStackParamList,
} from "./questions-nav";
import { archiveQuestion, editQuestion } from "./questions.slice";
import TypeSelection from "./TypeSelection";

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 16,
  },
});

const mapState = (state: RootState) => ({
  autofocusEnabled: !state.accessibility.autofocusDisabled,
});
const mapDispatch = { editQuestion, archiveQuestion, toggleDialogOpen };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const EditQuestionsScreen: FC<
  PropsFromRedux & StackScreenProps<QuestionsStackParamList, "Edit Question">
> = ({
  autofocusEnabled,
  editQuestion,
  archiveQuestion,
  route,
  toggleDialogOpen,
}) => {
  const { title, id, questionLong, type, active } = route.params;
  const nav = useNavigation<QuestionsNavigationProp>();
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedQuestionLong, setEditedQuestionLong] = useState(questionLong);
  const [editedType, setEditedType] = useState<"points" | "fulltext">(type);

  const [archiveConfirmationShown, showArchiveConfirmation] =
    React.useState(false);

  const theme = useTheme();
  const { t } = useTranslation();

  const saveEdits = () => {
    editQuestion({
      title: editedTitle,
      questionLong: editedQuestionLong,
      type: editedType,
      id,
      active,
    });
    nav.goBack();
  };

  const archiveThisQuestion = () => {
    archiveQuestion({ id });
    toggleDialogOpen();
    showArchiveConfirmation(false);
    nav.goBack();
  };

  const hasErrors = editedTitle === "";

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { justifyContent: "center", paddingHorizontal: 12 },
      ]}
    >
      <TextInput
        label={t("questions:title")}
        onChangeText={setEditedTitle}
        value={editedTitle}
        autoFocus={autofocusEnabled}
        autoComplete="off"
        style={styles.marginBottom}
        error={hasErrors}
      />
      <TextInput
        label={t("questions:longQuestion")}
        multiline={true}
        onChangeText={setEditedQuestionLong}
        value={editedQuestionLong}
        autoComplete="off"
        style={styles.marginBottom}
      />
      <TypeSelection
        type={editedType}
        setType={setEditedType}
        style={styles.marginBottom}
      />
      <Button
        mode="contained"
        onPress={saveEdits}
        style={styles.marginBottom}
        disabled={hasErrors}
        accessibilityLabel={t("questions:save")}
        accessibilityHint={t("questions:saveA11yHint")}
      >
        {t("questions:save")}
      </Button>
      <Button
        mode="contained"
        color={theme.colors.error}
        onPress={() => {
          toggleDialogOpen();
          showArchiveConfirmation(true);
        }}
        accessibilityHint={t("questions:archiveA11yHint")}
        accessibilityLabel={t("questions:archive")}
      >
        {t("questions:archive")}
      </Button>
      <ArchiveConfirmationDialog
        visible={archiveConfirmationShown}
        onCancel={() => {
          toggleDialogOpen();
          showArchiveConfirmation(false);
        }}
        onConfirm={archiveThisQuestion}
      />
    </View>
  );
};

export default connector(EditQuestionsScreen);
