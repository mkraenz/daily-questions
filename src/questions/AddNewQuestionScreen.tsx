import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { QuestionsNavigationProp } from "./questions-nav";
import { addQuestion } from "./questions.slice";
import TypeSelection from "./TypeSelection";

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 16,
  },
});

const mapState = (state: RootState) => ({
  autofocusEnabled: !state.accessibility.autofocusDisabled,
});
const mapDispatch = { addQuestion };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AddNewQuestionScreen: FC<PropsFromRedux> = ({
  autofocusEnabled,
  addQuestion,
}) => {
  const nav = useNavigation<QuestionsNavigationProp>();
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [titleChanged, setTitleChanged] = useState(false);
  const [longQuestion, setLongQuestion] = useState("");
  const [type, setType] = useState<"points" | "fulltext">("points");

  const hasErrors = title === "";
  const addNewQuestion = () => {
    addQuestion({ title, questionLong: longQuestion, type, active: true });
    nav.goBack();
  };
  const handleTitleChanged = (text: string) => {
    setTitleChanged(true);
    setTitle(text);
  };

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { justifyContent: "center", paddingHorizontal: 12 },
      ]}
    >
      <TextInput
        label={t("questions:title")}
        onChangeText={handleTitleChanged}
        value={title}
        autoFocus={autofocusEnabled}
        autoComplete="off"
        placeholder={t("questions:placeHolderExample", {
          example: t("defaultQuestions:Goals"),
        })}
        style={styles.marginBottom}
        error={titleChanged && hasErrors}
        accessibilityLabel={t("questions:titleInputA11yLabel")}
      />
      <TextInput
        label={t("questions:longQuestion")}
        multiline={true}
        onChangeText={setLongQuestion}
        value={longQuestion}
        autoComplete="off"
        placeholder={t("questions:placeHolderExample", {
          example: t("defaultQuestions:questionLongGoals"),
        })}
        style={styles.marginBottom}
        accessibilityLabel={t("questions:longQuestionInputA11yLabel")}
      />
      <TypeSelection
        type={type}
        setType={setType}
        style={styles.marginBottom}
      />
      <Button
        mode="contained"
        onPress={addNewQuestion}
        disabled={hasErrors}
        accessibilityLabel={t("questions:create")}
        accessibilityHint={t("questions:createButtonA11yHint")}
      >
        {t("questions:create")}
      </Button>
    </View>
  );
};

export default connector(AddNewQuestionScreen);
