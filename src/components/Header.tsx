import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <header className="h-14 flex-shrink-0 px-2 flex items-center bg-gray-200 w-full">
      <FontAwesomeIcon icon="plate-wheat" className="mr-2" />
      <span className="flex-1">Nutrition Tracker</span>
    </header>
  );
}
