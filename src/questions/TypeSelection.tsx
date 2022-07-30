import React, { FC } from "react";
import { StyleProp } from "react-native";
import { Button, Menu } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { toggleDialogOpen } from "../accessibility/accessibility.slice";
import { useTranslation } from "../localization/useTranslations";

const allTypes = ["points", "fulltext"] as const;
const mapDispatch = { toggleDialogOpen };
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props {
  type: "points" | "fulltext";
  setType: (type: "points" | "fulltext") => void;
  style: StyleProp<{}>;
}

const TypeSelection: FC<Props & PropsFromRedux> = ({
  type,
  setType,
  style,
  toggleDialogOpen,
}) => {
  const [visible, setVisible] = React.useState(false);
  const { t } = useTranslation();

  const openMenu = () => {
    toggleDialogOpen();
    setVisible(true);
  };
  const closeMenu = () => {
    toggleDialogOpen();
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      overlayAccessibilityLabel={t(
        "questions:typeSelectMenuBackOverlayA11yLabel"
      )}
      anchor={
        <Button
          mode="outlined"
          onPress={openMenu}
          style={style}
          contentStyle={{ flexDirection: "row-reverse" }}
          icon="menu-down"
          accessibilityLabel={t("questions:type", {
            type: t(`questions:type${type}`),
          })}
          accessibilityHint={t("questions:typeSelectMenuButtonA11yHint")}
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

export default connector(TypeSelection);
