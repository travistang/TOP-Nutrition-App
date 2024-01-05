import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type FabMenuItemProps = {
  text: string;
  icon: IconProp;
  onClick: () => void;
};
export default function FabMenuItem({ text, icon, onClick }: FabMenuItemProps) {
  return (
    <div
      onClick={onClick}
      className=" flex flex-row justify-end items-center gap-2 flex-nowrap px-4 text-sm font-bold"
    >
      <span className="text-sm font-bold">{text}</span>
      <FontAwesomeIcon
        icon={icon}
        className="rounded-full bg-blue-500 child:fill-gray-200 p-2 h-8 w-8 items-center justify-center"
      />
    </div>
  );
}
