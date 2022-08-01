import { FC } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useTranslation } from "../../localization/useTranslations";

const styles = StyleSheet.create({
  button: {
    marginBottom: 12,
    minWidth: "50%",
  },
});

const SeparateConfirmAndShareButtons: FC<{
  handleConfirmPressed: () => void;
  handleSharePressed: () => void;
}> = ({ handleConfirmPressed, handleSharePressed }) => {
  const { t } = useTranslation();
  return (
    <>
      <Button
        onPress={handleConfirmPressed}
        mode="contained"
        icon="check"
        style={styles.button}
        accessibilityLabel={t("general:confirm")}
        accessibilityHint={t("dailies:confirmDailiesA11yHint")}
      >
        {t("general:confirm")}
      </Button>
      <Button
        onPress={handleSharePressed}
        mode="outlined"
        icon="share"
        style={styles.button}
        accessibilityLabel={t("dailies:share")}
        accessibilityHint={t("dailies:shareA11yHint")}
      >
        {t("dailies:share")}
      </Button>
    </>
  );
};

export default SeparateConfirmAndShareButtons;
