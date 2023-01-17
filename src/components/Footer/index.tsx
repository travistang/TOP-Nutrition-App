import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import WorkoutTimer from "./WorkoutTimer";

type FooterButtonConfig = {
  icon: IconProp;
  path: string;
};

const footerButtonConfigs: FooterButtonConfig[] = [
  {
    icon: "list",
    path: "/",
  },
  {
    icon: "line-chart",
    path: "/stats",
  },
  {
    icon: "dumbbell",
    path: "/workouts",
  },
  {
    icon: "box",
    path: "/containers",
  },
  {
    icon: "cogs",
    path: "/settings",
  },
];
export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const goToPage = (nextPath: string) => () => {
    if (path === nextPath) return;
    navigate(nextPath);
  };

  return (
    <nav className="z-30 fixed bottom-0 left-0 right-0 h-16 bg-gray-200 flex items-stretch flex-col">
      <div className="flex flex-nowrap relative items-center justify-around h-full">
        <WorkoutTimer />
        {footerButtonConfigs.map((config) => (
          <div
            key={config.path}
            className="p-2 relative flex flex-col items-center flex-1"
            onClick={goToPage(config.path)}
          >
            <FontAwesomeIcon
              key={config.path}
              icon={config.icon}
            />
            {config.path === path && (
              <div className="absolute bottom-0 w-4 h-1 rounded-full bg-gray-400" />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
