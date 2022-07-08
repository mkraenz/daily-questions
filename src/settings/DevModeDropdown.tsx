import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { setDevMode } from "../settings/settings.slice";
import { RootState } from "../store";

const mapState = (state: RootState) => ({ devMode: state.settings.devMode });
const mapDispatch = { setDevMode };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

const DropDownMenu: FC<PropsFromRedux> = ({ devMode, setDevMode }) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const activateDevMode = () => {
    setDevMode(true);
    closeMenu();
  };
  const deactivateDevMode = () => {
    setDevMode(false);
    closeMenu();
  };

  const env = devMode ? "Experimental" : "Production";
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button
          mode="outlined"
          onPress={openMenu}
          style={styles.container}
          contentStyle={{ flexDirection: "row-reverse" }}
          icon="menu-down"
        >
          Environment: {env}
        </Button>
      }
    >
      <Menu.Item onPress={deactivateDevMode} title="Production" />
      <Menu.Item
        onPress={activateDevMode}
        title="Experimental (use with caution)"
      />
    </Menu>
  );
};

export default connector(DropDownMenu);
