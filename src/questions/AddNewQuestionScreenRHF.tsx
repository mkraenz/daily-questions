import { zodResolver } from "@hookform/resolvers/zod";
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
import { z } from "zod";
import {
  TranslateFunction,
  useTranslation,
} from "../localization/useTranslations";
import { RootState } from "../store";
import { QuestionsNavigationProp } from "./questions-nav";
import { addQuestion } from "./questions.slice";
import TypeSelection from "./TypeSelection";

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

const questionSchema = (t: TranslateFunction) =>
  z.object({
    title: z.string().nonempty(t("questions:titleRequiredError", { min: 3 })), // with this pattern, we can pass variables to the error message
    longQuestion: z.string(),
    type: z.enum(["points", "fulltext"]),
  });
type Question = z.infer<ReturnType<typeof questionSchema>>;

const AddNewQuestionScreen: FC<PropsFromRedux> = ({
  autofocusEnabled,
  addQuestion,
}) => {
  const nav = useNavigation<QuestionsNavigationProp>();
  const { t, i18n } = useTranslation();

  const {
    setValue,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isDirty },
    trigger,
  } = useForm<Question>({
    resolver: zodResolver(questionSchema(t)),
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
    // isDirty to avoid triggering on mount (because it would show error message for required title)
    if (isDirty) trigger();
  }, [i18n.language, isDirty, trigger]); // react-hook-forms keeps it error state messages when language changes. Since we use {required: t("myerrormessage")}, we need to reevaluate the state when language changes. Alternatively, we could use {required: true} and then use then error our own translated error message depending on the type but then writing the components for each error type becomes quite cumbersome.

  console.log("errors", errors);
  console.log("values", getValues());
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
              // rules={{ required: t("questions:titleRequiredError") }}
              render={({ field: { onChange, value, name } }) => (
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
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label={t("questions:longQuestion")}
                  multiline={true}
                  onChangeText={onChange}
                  value={value}
                  autoComplete="off"
                  placeholder={t("questions:placeHolderExample", {
                    example: t("defaultQuestions:questionLongGoals"),
                  })}
                  accessibilityLabel={t("questions:longQuestionInputA11yLabel")}
                />
              )}
            />
          </View>

          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            render={({ field: { value } }) => (
              <TypeSelection
                type={value}
                // using setValue instead of onChange because onChange allows param type any. We also don't need to trigger validation here because the type is always valid (thanks to TS)
                setType={(t) => setValue("type", t)}
                style={styles.marginBottom}
              />
            )}
          />

          <Button
            mode="contained"
            onPress={onSubmit}
            disabled={!isDirty || hasErrors}
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
