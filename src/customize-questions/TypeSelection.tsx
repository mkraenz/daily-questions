import { capitalize } from "lodash";
import React, { FC } from "react";
import { StyleProp } from "react-native";
import { Button, Menu } from "react-native-paper";

const allTypes = ["points", "fulltext"] as const;

interface Props {
  type: "points" | "fulltext";
  setType: (type: "points" | "fulltext") => void;
  style: StyleProp<{}>;
}

const TypeSelection: FC<Props> = ({ type, setType, style }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button mode="outlined" onPress={openMenu} style={style}>
          Type: {type}
        </Button>
      }
    >
      {allTypes.map((t) => (
        <Menu.Item
          key={t}
          title={capitalize(t)}
          onPress={() => {
            setType(t);
            closeMenu();
          }}
        />
      ))}
    </Menu>
  );
};

export default TypeSelection;
