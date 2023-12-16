import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type Props = {
  opened?: boolean;
  onClose: () => void;
};
export default function DrawerMenu({ opened, onClose }: Props) {
  return (
    <div
      className={classNames(
        "fixed inset-0 flex flex-end",
        opened && "backdrop-blur-lg"
      )}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-10 shadow-lg p-2 flex flex-col items-stretch gap-2"
      >
        <div className="text-sm flex flex-col p-2 items-center gap-2 rounded-lg">
          <FontAwesomeIcon icon="hamburger" />
          Nutrition
        </div>
      </div>
    </div>
  );
}
