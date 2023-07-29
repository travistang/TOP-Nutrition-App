import { createContext, useState } from "react";

export type DrawerContextValue = {
  openDrawer: () => void;
  drawerOpened: boolean;
  closeDrawer: () => void;
};
export const drawerContext = createContext<DrawerContextValue>({
  openDrawer: () => {},
  closeDrawer: () => {},
  drawerOpened: false,
});

const DrawerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const openDrawer = () => setDrawerOpened(true);
  const closeDrawer = () => setDrawerOpened(false);
  return (
    <drawerContext.Provider value={{ drawerOpened, openDrawer, closeDrawer }}>
      {children}
    </drawerContext.Provider>
  );
};

export default DrawerContextProvider;
