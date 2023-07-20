import React, { useContext } from "react";
import classNames from "classnames";
import { drawerContext } from "./DrawerContext";
import Button, { ButtonStyle } from "../Input/Button";

export default function DrawerHeader() {
  const { drawerOpened, closeDrawer } = useContext(drawerContext);
  if (!drawerOpened) return null;
  return (
    <div className="flex items-center p-4">
      <Button buttonStyle={ButtonStyle.Clear} onClick={closeDrawer} />
    </div>
  );
}
