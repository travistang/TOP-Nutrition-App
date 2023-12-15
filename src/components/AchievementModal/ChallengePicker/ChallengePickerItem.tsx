import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Challenge } from "../../../types/Achievement";
import ChallengeSummaryItemWithContext from "../../ChallengeSummaryPage/ChallengeSummaryItem/ChallengeSummaryItemWithContext";

type PickerItemIconProps = {
  selected?: boolean;
  disabled?: boolean;
};

type Props = PickerItemIconProps & {
  className?: string;
  challenge: Challenge;
  onClick: () => void;
};

export function ChallengePickerItemIcon({ selected, disabled }: PickerItemIconProps) {
  if (disabled) {
    return (
      <FontAwesomeIcon icon="ban" className="h-6 w-6 child:fill-gray-500" />
    );
  }

  if (selected) {
    return (
      <FontAwesomeIcon
        icon="check-circle"
        className="h-6 w-6 child:fill-gray-500"
      />
    );
  }
  return <div className="rounded-full h-6 w-6 border-2 border-gray-500" />;
}
export default function ChallengePickerItem({
  selected,
  disabled,
  onClick,
  challenge,
  className,
}: Props) {
  const guardedOnClick = () => {
    if (disabled) return;
    onClick();
  };
  return (
    <div
      onClick={guardedOnClick}
      className={classNames(
        "flex items-center gap-2",
        disabled && "opacity-70",
        className
      )}
    >
      <ChallengeSummaryItemWithContext
        className="flex-1"
        challenge={challenge}
      />
      <ChallengePickerItemIcon selected={selected} disabled={disabled} />
    </div>
  );
}
