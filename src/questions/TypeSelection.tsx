import React, { FC } from "react";
import { StyleProp } from "react-native";
import { Button, Menu } from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";

const allTypes = ["points", "fulltext"] as const;

interface Props {
  type: "points" | "fulltext";
  setType: (type: "points" | "fulltext") => void;
  style: StyleProp<{}>;
}

const TypeSelection: FC<Props> = ({ type, setType, style }) => {
  const [visible, setVisible] = React.useState(false);
  const { t } = useTranslation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button
          mode="outlined"
          onPress={openMenu}
          style={style}
          contentStyle={{ flexDirection: "row-reverse" }}
          icon="menu-down"
        >
          {t("questions:type", { type: t(`questions:type${type}`) })}
        </Button>
      }
    >
      {allTypes.map((_type) => (
        <Menu.Item
          key={_type}
          title={t(`questions:type${_type}`)}
          onPress={() => {
            setType(_type);
            closeMenu();
          }}
        />
      ))}
    </Menu>
  );
};

export default TypeSelection;
