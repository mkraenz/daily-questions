import React, { FC } from "react";
import { Linking, StyleSheet } from "react-native";
import {
  MD2Theme,
  Paragraph,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "underline",
  },
  container: {
    marginBottom: 24,
  },
});

const GithubNote: FC = () => {
  const theme = useTheme<MD2Theme>();
  const { t } = useTranslation();
  const openGithub = () => {
    Linking.openURL("https://github.com/proSingularity/daily-questions");
  };
  return (
    <TouchableRipple
      onPress={openGithub}
      style={styles.container}
      accessibilityRole="link"
      accessibilityLabel={t("about:githubA11yLabel")}
      accessibilityHint={t("about:githubA11yHint")}
    >
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
