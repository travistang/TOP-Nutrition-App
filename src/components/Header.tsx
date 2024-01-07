import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import DrawerMenu from "./DrawerMenu";

export default function Header() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const openDrawer = useCallback(
    (willOpen: boolean) => () => setDrawerOpened(willOpen),
    []
  );
  return (
    <header className="h-14 flex-shrink-0 px-2 flex items-center justify-between bg-gray-200 w-full">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon="plate-wheat" className="mr-2" />
        <span className="flex-1">Nutrition Tracker</span>
      </div>
      <FontAwesomeIcon icon="bars" onClick={openDrawer(true)} />
      {createPortal(
        <DrawerMenu opened={drawerOpened} onClose={openDrawer(false)} />,
        document.getElementById("root")!
      )}
    </header>
  );
}
