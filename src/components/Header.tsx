import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPortal } from "react-dom";
import DrawerMenu from "./DrawerMenu";

export default function Header() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  return (
    <header className="h-14 flex-shrink-0 px-2 flex items-center justify-between bg-gray-200 w-full">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon="plate-wheat" className="mr-2" />
        <span className="flex-1">Nutrition Tracker</span>
      </div>
      <FontAwesomeIcon icon="bars" />
      {createPortal(
        <DrawerMenu
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
        />,
        document.getElementById("root")!
      )}
    </header>
  );
}
