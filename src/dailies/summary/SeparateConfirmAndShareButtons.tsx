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
      >
        {t("general:confirm")}
      </Button>
      <Button
        onPress={handleSharePressed}
        mode="contained"
        icon="share"
        style={styles.button}
      >
        {t("dailies:share")}
      </Button>
    </>
  );
};

export default SeparateConfirmAndShareButtons;
