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

const AddNewQuestionScreen: FC<PropsFromRedux> = ({
  autofocusEnabled,
  addQuestion,
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      title: "",
      longQuestion: "",
    },
  });
  // useEffect(clearErrors, [language]); // react-hook-forms keeps it error state when language changes. Since we use {required: t("myerrormessage")}, we need to clear the state when language changes. Alternatively, we could use {required: true} and then use then error our own translated error message depending on the type.

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  console.log("errors", errors);
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[StyleSheet.absoluteFill, styles.container]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
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
                style={styles.marginBottom}
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
          <Controller
            control={control}
            name="longQuestion"
            rules={{ required: true }}
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
                style={styles.marginBottom}
                accessibilityLabel={t("questions:longQuestionInputA11yLabel")}
              />
            )}
          />
          {errors.longQuestion?.type === "required" && (
            <HelperText type="error" visible>
              {t(`questions:longQuestionRequiredError`)}
            </HelperText>
          )}

          <Button
            onPress={() => {
              reset({
                title: "",
                longQuestion: "",
              });
            }}
          >
            Reset
          </Button>

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
