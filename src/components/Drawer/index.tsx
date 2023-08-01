import classNames from "classnames";
import React from "react";
import DrawerContainer from "./DrawerContainer";
import DrawerContextProvider from "./DrawerContext";

type Props = {
  className?: string;
  children?: React.ReactNode;
};
export default function Drawer({ className, children }: Props) {
  return (
    <DrawerContextProvider>
      <DrawerContainer className={classNames("overflow-x-hidden", className)}>
        {children}
      </DrawerContainer>
    </DrawerContextProvider>
  );
}
