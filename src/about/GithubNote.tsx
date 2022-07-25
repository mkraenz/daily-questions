import React, { FC } from "react";
import { Linking, StyleSheet } from "react-native";
import { Paragraph, TouchableRipple, useTheme } from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "underline",
  },
});

const GithubNote: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const openGithub = () => {
    Linking.openURL("https://github.com/proSingularity/daily-questions");
  };
  return (
    <TouchableRipple onPress={openGithub}>
      <Paragraph>
        {t("about:githubDescription")}
        <Paragraph style={[styles.link, { color: theme.colors.accent }]}>
          {t("about:githubLinkText")}
        </Paragraph>
      </Paragraph>
    </TouchableRipple>
  );
};

export default GithubNote;
