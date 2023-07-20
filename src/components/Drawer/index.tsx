import React from "react";
import DrawerContextProvider from "./DrawerContext";
import DrawerContainer from "./DrawerContainer";

type Props = {
  className?: string;
  children?: React.ReactNode;
  drawerContent: React.ReactNode;
};
export default function Drawer({ className, children, drawerContent }: Props) {
  return (
    <DrawerContextProvider>
      <DrawerContainer drawerContent={drawerContent} className={className}>
        {children}
      </DrawerContainer>
    </DrawerContextProvider>
  );
}
