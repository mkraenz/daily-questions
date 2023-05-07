import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { QuestionsNavigationProp } from "./questions-nav";
import { addQuestion } from "./questions.slice";

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 16,
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: 12,
  },
});

const mapState = (state: RootState) => ({
  autofocusEnabled: !state.accessibility.autofocusDisabled,
});
const mapDispatch = { addQuestion };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface FormValues {
  title: string;
  longQuestion: string;
  type: "points" | "fulltext";
}

const AddNewQuestionScreen: FC<PropsFromRedux> = ({
  autofocusEnabled,
  addQuestion,
}) => {
  const nav = useNavigation<QuestionsNavigationProp>();
  const { t, i18n } = useTranslation();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
    trigger,
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      longQuestion: "",
      type: "points",
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    addQuestion({
      title: data.title,
      questionLong: data.longQuestion,
      type: data.type,
      active: true,
    });
    nav.goBack();
  });
  useEffect(() => {
    // isDirty to avoid triggering on mount
    if (isDirty) trigger(); // intentionally only passing language into the dependency array. We only want to run this when the language changes.
  }, [i18n.language]); // react-hook-forms keeps it error state messages when language changes. Since we use {required: t("myerrormessage")}, we need to reevaluate the state when language changes. Alternatively, we could use {required: true} and then use then error our own translated error message depending on the type but then writing the components for each error type becomes quite cumbersome.

  console.log("errors", errors);
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[StyleSheet.absoluteFill]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[StyleSheet.absoluteFill, styles.container]}>
          <View style={styles.marginBottom}>
            <Controller
              control={control}
              name="title"
              rules={{ required: t("questions:titleRequiredError") }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <TextInput
                  label={t("questions:title")}
                  onChangeText={onChange}
                  value={value}
                  autoFocus={autofocusEnabled}
                  autoComplete="off"
                  placeholder={t("questions:placeHolderExample", {
                    example: t("defaultQuestions:Goals"),
                  })}
                  error={Boolean(errors[name])}
                  accessibilityLabel={t("questions:titleInputA11yLabel")}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.title && (
              <HelperText type="error" visible>
                {errors.title.message}
              </HelperText>
            )}
          </View>
          <View style={styles.marginBottom}>
            <Controller
              control={control}
              name="longQuestion"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={t("questions:longQuestion")}
                  multiline={true}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  autoComplete="off"
                  placeholder={t("questions:placeHolderExample", {
                    example: t("defaultQuestions:questionLongGoals"),
                  })}
                  accessibilityLabel={t("questions:longQuestionInputA11yLabel")}
                />
              )}
            />
          </View>

          <Button
            mode="contained"
            onPress={onSubmit}
            disabled={hasErrors}
            accessibilityLabel={t("questions:create")}
            accessibilityHint={t("questions:createButtonA11yHint")}
          >
            {t("questions:create")}
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default connector(AddNewQuestionScreen);
