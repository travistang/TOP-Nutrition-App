import React from "react";
import DrawerContextProvider from "./DrawerContext";
import DrawerContainer from "./DrawerContainer";

type Props = {
  className?: string;
  children?: React.ReactNode;
};
export default function Drawer({ className, children }: Props) {
  return (
    <DrawerContextProvider>
      <DrawerContainer className={className}>{children}</DrawerContainer>
    </DrawerContextProvider>
  );
}
