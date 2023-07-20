import React, { useContext } from "react";
import classNames from "classnames";
import DrawerHeader from "./DrawerHeader";
import { drawerContext } from "./DrawerContext";

type Props = {
  className?: string;
  children?: React.ReactNode;
  drawerContent: React.ReactNode;
};

export default function DrawerContainer({
  children,
  drawerContent,
  className,
}: Props) {
  const { drawerOpened } = useContext(drawerContext);
  return (
    <div
      className={classNames(
        "w-[200vw] flex flex-nowrap overflow-x-hidden",
        "transition-transform duration-300 ease-in-out",
        drawerOpened && "translate-x-screen",
        className
      )}
    >
      {drawerOpened ? (
        <div className="flex flex-col items-stretch w-screen">
          <DrawerHeader />
          {drawerContent}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
