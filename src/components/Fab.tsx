import React from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import { fabMenuAtom } from "../atoms/FabMenuAtom";

type Props = {
  onClick: () => void;
  className?: string;
  icon: IconProp;
};
export default function Fab({ onClick, className, icon }: Props) {
  const { fabMenuOpened } = useRecoilValue(fabMenuAtom);
  return (
    <button
      className={classNames(
        fabMenuOpened ? "bottom-6" : "bottom-16 -translate-y-2",
        "absolute right-4 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center z-50",
        className
      )}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={icon}
        className="text-gray-200 child:fill-gray-200"
      />
    </button>
  );
}
