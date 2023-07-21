import React, { useContext } from "react";
import classNames from "classnames";
import DrawerHeader from "./DrawerHeader";
import { drawerContext } from "./DrawerContext";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function DrawerContainer({ children, className }: Props) {
  const { drawerOpened } = useContext(drawerContext);
  return (
    <div
      className={classNames(
        "w-[200vw] flex flex-nowrap overflow-x-hidden",
        "transition-transform duration-300 ease-in-out",
        drawerOpened && "-translate-x-[100vw]",
        className
      )}
    >
      {children}
    </div>
  );
}

export const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen items-stretch justify-center overflow-hidden px-2">
      {children}
    </div>
  );
};

export const DrawerContent = ({
  backButtonText,
  children,
}: {
  backButtonText?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="order-1 flex flex-col items-stretch w-screen overflow-hidden px-2">
      <DrawerHeader backButtonText={backButtonText} />
      {children}
    </div>
  );
};
