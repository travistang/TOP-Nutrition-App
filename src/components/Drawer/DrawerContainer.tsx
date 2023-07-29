import classNames from "classnames";
import React, { useContext } from "react";
import { drawerContext } from "./DrawerContext";
import DrawerHeader from "./DrawerHeader";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function DrawerContainer({ children, className }: Props) {
  const { drawerOpened } = useContext(drawerContext);
  return (
    <div className={(classNames("w-screen overflow-x-hidden"), className)}>
      <div
        className={classNames(
          "w-[200vw] flex flex-nowrap",
          "transition-transform duration-300 ease-in-out",
          drawerOpened && "-translate-x-[100vw]"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export const MainContent = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={classNames(
        "flex w-screen items-stretch justify-center overflow-hidden px-2",
        className
      )}
    >
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
