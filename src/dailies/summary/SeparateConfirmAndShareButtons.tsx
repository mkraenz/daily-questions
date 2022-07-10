import { FC } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

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
  return (
    <>
      <Button
        onPress={handleConfirmPressed}
        mode="contained"
        icon="check"
        style={styles.button}
      >
        Confirm
      </Button>
      <Button
        onPress={handleSharePressed}
        mode="contained"
        icon="share"
        style={styles.button}
      >
        Share
      </Button>
    </>
  );
};

export default SeparateConfirmAndShareButtons;
