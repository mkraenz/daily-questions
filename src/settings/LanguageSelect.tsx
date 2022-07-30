import React, { FC } from "react";
import { Menu } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { toggleDialogOpen } from "../accessibility/accessibility.slice";
import { useTranslation } from "../localization/useTranslations";
import SettingsButtonRow from "./SettingsButtonRow";

interface Props {}

const langCodeToLanguage = {
  en: "English",
  de: "Deutsch",
  ja: "日本語",
};

const mapDispatch = { toggleDialogOpen };
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
// remember to wrap your component in connector!

const LanguageSelect: FC<PropsFromRedux> = ({ toggleDialogOpen }) => {
  const [visible, setVisible] = React.useState(false);
  const { i18n, t } = useTranslation();

  const openMenu = () => {
    toggleDialogOpen();
    setVisible(true);
  };
  const closeMenu = () => {
    toggleDialogOpen();
    setVisible(false);
  };
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
      overlayAccessibilityLabel={t("general:cancelDialogA11yHint")}
      anchor={
        <SettingsButtonRow
          title={t("settings:language")}
          value={selectedLanguage}
          accessibilityLabel={t("settings:languageA11yLabel")}
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

export default connector(LanguageSelect);
