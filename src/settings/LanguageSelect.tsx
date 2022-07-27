import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Menu } from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";
import SettingsButtonRow from "./SettingsButtonRow";

interface Props {}

const styles = StyleSheet.create({
  button: {
    marginBottom: 12,
  },
});

const langCodeToLanguage = {
  en: "English",
  de: "Deutsch",
  ja: "日本語",
};

const LanguageSelect: FC<Props> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const { i18n, t } = useTranslation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    closeMenu();
  };

  const selectedLanguage =
    langCodeToLanguage[i18n.language as keyof typeof langCodeToLanguage];
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <SettingsButtonRow
          title={t("settings:language")}
          value={selectedLanguage}
          accessibilityLabel={t("settings:languageA11yLabel", {
            language: selectedLanguage,
          })}
          accessibilityHint={t("settings:languageA11yHint")}
          onPress={openMenu}
        />
      }
    >
      <Menu.Item title={"English"} onPress={() => changeLanguage("en")} />
      <Menu.Item title={"Deutsch"} onPress={() => changeLanguage("de")} />
      <Menu.Item title={"日本語"} onPress={() => changeLanguage("ja")} />
    </Menu>
  );
};

export default LanguageSelect;
