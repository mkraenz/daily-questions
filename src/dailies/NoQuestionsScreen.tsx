import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Paragraph } from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";
import { GlobalDrawerNavigationProp } from "../nav";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginBottom: 20,
  },
});

const NoQuestionsScreen: FC = () => {
  const { t } = useTranslation();
  const nav = useNavigation<GlobalDrawerNavigationProp>();
  const handlePress = () => {
    nav.navigate("Customize Questions");
  };
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Paragraph style={styles.text}>{t("dailies:noQuestions")}</Paragraph>
      <Button onPress={handlePress} mode="contained">
        {t("dailies:noQuestionsButton")}
      </Button>
    </View>
  );
};

export default NoQuestionsScreen;
