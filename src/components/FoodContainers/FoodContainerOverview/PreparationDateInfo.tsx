import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FoodContainer } from "../../../types/FoodContainer";
import { differenceInDays } from "date-fns";

type Props = {
  preparationDate: FoodContainer["preparationDate"];
};
const preparationDateText = (date: number): JSX.Element => {
    const dayDifference = differenceInDays(Date.now(), date);
    const intervalText = dayDifference  === 0 ? "Today" : `${dayDifference} days`;
    return (
        <>
            <FontAwesomeIcon icon="clock" />
            {intervalText}
        </>
    )
};

export default function PreparationDateInfo({ preparationDate }: Props) {
  return (
    <div className="row-span-2 col-start-1 col-span-1 text-3xl flex items-center">
      {!preparationDate ? (
        <FontAwesomeIcon icon="battery-empty" />
      ) : (
        <span className="text-xs font-bold flex items-center gap-1 flex-nowrap">
          {preparationDateText(preparationDate)}
        </span>
      )}
    </div>
  );
}
