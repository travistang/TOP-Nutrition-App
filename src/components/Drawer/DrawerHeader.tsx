import React, { useContext } from "react";
import { drawerContext } from "./DrawerContext";
import Button, { ButtonStyle } from "../Input/Button";
import classNames from "classnames";

type Props = {
  backButtonText?: string;
};
export default function DrawerHeader({ backButtonText = "Back" }: Props) {
  const { drawerOpened, closeDrawer } = useContext(drawerContext);
  return (
    <div
      className={classNames(
        "flex items-center transition-transform duration-300",
        !drawerOpened && "-translate-x-[200vw]"
      )}
    >
      <Button
        buttonStyle={ButtonStyle.Clear}
        onClick={closeDrawer}
        icon="arrow-left"
        text={backButtonText}
      />
    </div>
  );
}
