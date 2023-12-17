import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export type DrawerMenuItemProps = {
  url: string;
  icon: IconProp;
  title: string;
  onClick?: () => void;
};
export default function DrawerMenuItem({
  url,
  icon,
  title,
  onClick,
}: DrawerMenuItemProps) {
  const navigate = useNavigate();
  const goToUrl = () => {
    navigate(url);
    onClick?.();
  };

  return (
    <div
      onClick={goToUrl}
      className="text-sm flex p-2 items-center gap-2 rounded-lg"
    >
      <FontAwesomeIcon icon={icon} />
      {title}
    </div>
  );
}
