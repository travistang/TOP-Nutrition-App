import classNames from "classnames";
import { useEffect, useState } from "react";
import Button, { ButtonStyle } from "../Input/Button";
import DrawerMenuItem, { DrawerMenuItemProps } from "./DrawerMenuItem";

type Props = {
  opened?: boolean;
  onClose: () => void;
};
enum DrawerState {
  Opened,
  Closed,
  Opening,
  Closing,
}
const ITEMS: DrawerMenuItemProps[] = [
  {
    title: "Nutrition",
    icon: "pie-chart",
    url: "/stats",
  },
  {
    title: "Food details",
    icon: "hamburger",
    url: "/stats/food",
  },
  {
    title: "Exercises",
    icon: "dumbbell",
    url: "/stats/exercise",
  },
  {
    title: "Workouts",
    icon: "person-running",
    url: "/stats/workouts",
  },
  {
    title: "Measurements",
    icon: "ruler",
    url: "/stats/measurements",
  },
  {
    title: "Food Containers",
    icon: "boxes",
    url: "/containers",
  },
  {
    title: "Challenges",
    icon: "trophy",
    url: "/challenges",
  },
];
export default function DrawerMenu({ opened, onClose }: Props) {
  const [state, setState] = useState<DrawerState>(
    opened ? DrawerState.Opened : DrawerState.Closed
  );

  useEffect(() => {
    if (opened && state === DrawerState.Closed) {
      setState(DrawerState.Opening);
      setTimeout(() => {
        setState(DrawerState.Opened);
      }, 300);
    }
    if (!opened && state === DrawerState.Opened) {
      setState(DrawerState.Closing);
      setTimeout(() => {
        setState(DrawerState.Closed);
      }, 300);
    }
  }, [opened, state]);

  return (
    <div
      className={classNames(
        "fixed inset-0 flex flex-end transition-all duration-300 justify-end",
        {
          "backdrop-blur-sm z-10 bg-gray-500/50":
            state === DrawerState.Opened || state === DrawerState.Opening,
          "backdrop-blur-none bg-gray-500/0 z-10":
            state === DrawerState.Closing,
          "backdrop-blur-none bg-gray-500/0 -z-10":
            state === DrawerState.Closed,
        }
      )}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classNames(
          "z-10 shadow-lg p-2 flex flex-col items-stretch gap-2 transition-all duration-300 w-2/3 bg-gray-200",
          state === DrawerState.Opened || state === DrawerState.Opening
            ? "translate-x-0"
            : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-end py-2 pr-2">
          <Button
            buttonStyle={ButtonStyle.Clear}
            icon="times"
            onClick={onClose}
          />
        </div>
        {ITEMS.map((item) => (
          <DrawerMenuItem onClick={onClose} key={item.url} {...item} />
        ))}
      </div>
    </div>
  );
}
