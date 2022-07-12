import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEM: Record<string, { icon: IconProp; link: string }> = {
  "/": {
    icon: "line-chart",
    link: "/stats",
  },
  "/stats": {
    icon: "list",
    link: "/",
  },
};
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItemConfig = NAV_ITEM[location.pathname];

  return (
    <header className="h-14 px-2 flex items-center bg-gray-200 w-full">
      <FontAwesomeIcon icon="plate-wheat" className="mr-2" />
      <span className="flex-1">Nutrition Tracker</span>
      <FontAwesomeIcon
        icon={navItemConfig.icon}
        onClick={() => navigate(navItemConfig.link)}
      />
    </header>
  );
}
