import type { Meta } from "@storybook/react";

import Drawer from ".";
import { useContext } from "react";
import { drawerContext } from "./DrawerContext";

const meta: Meta<typeof Drawer> = {
  title: "Component/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: <div className="text items-center justify-center">Children</div>,
    drawerContent: (
      <div className="text items-center justify-center">Content</div>
    ),
  },
};

export default meta;
const DrawerMain = () => {
  const { openDrawer } = useContext(drawerContext);
  return <button onClick={openDrawer}>Open drawer</button>;
};

export const Main = (args: Meta<typeof Drawer>["args"]) => {
  return (
    <Drawer
      {...(args as any)}
      drawerContent={args?.drawerContent ?? <div></div>}
    >
      <DrawerMain />
    </Drawer>
  );
};
