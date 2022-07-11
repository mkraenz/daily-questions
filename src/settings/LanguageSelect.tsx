import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";

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

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button
          mode="outlined"
          onPress={openMenu}
          contentStyle={{ flexDirection: "row-reverse" }}
          icon="menu-down"
          style={styles.button}
        >
          {t("settings:language", {
            language:
              langCodeToLanguage[
                i18n.language as keyof typeof langCodeToLanguage
              ],
          })}
        </Button>
      }
    >
      <Menu.Item title={"English"} onPress={() => changeLanguage("en")} />
      <Menu.Item title={"Deutsch"} onPress={() => changeLanguage("de")} />
      <Menu.Item title={"日本語"} onPress={() => changeLanguage("ja")} />
    </Menu>
  );
};

export default LanguageSelect;
