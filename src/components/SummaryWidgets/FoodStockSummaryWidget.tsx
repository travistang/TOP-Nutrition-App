import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useLiveQuery } from "dexie-react-hooks";
import consumptionDatabase from "../../database/ConsumptionDatabase";
import Section from "../Section";
import SmallNotice from "../SmallNotice";

type Props = {
  className?: string;
};
export default function FoodStockSummaryWidget({ className }: Props) {
  const foodStockSummary = useLiveQuery(() => {
    return consumptionDatabase.foodStockSummary();
  }) ?? {
    restock: [],
    expired: [],
  };
  const noAttentionRequired =
    Object.values(foodStockSummary ?? {}).flat().length === 0;
  const { restock, expired } = foodStockSummary;
  const toFoodStockPage = () => {
    // TODO: redirect to stock page...
  };
  return (
    <Section
      label="Food stock"
      onClick={toFoodStockPage}
      blink={!noAttentionRequired}
      className={classNames(className)}
    >
      <div className="relative flex-1 flex flex-col justify-center items-stretch gap-2">
        {noAttentionRequired && (
          <SmallNotice icon="check-circle">Food stock is normal</SmallNotice>
        )}
        {restock.length > 0 && (
          <SmallNotice
            icon="exclamation-circle"
            iconClassName="child:fill-red-500"
            className="text-red-500 font-bold"
          >
            {`${restock.length} food under-stocked`}
          </SmallNotice>
        )}
        {expired.length > 0 && (
          <SmallNotice
            icon="exclamation-circle"
            iconClassName="child:fill-yellow-500"
            className="text-yellow-500 font-bold"
          >
            {`${expired.length} food expired`}
          </SmallNotice>
        )}
        <FontAwesomeIcon
          icon="ellipsis-h"
          className="w-4 h-4 absolute right-0 bottom-0"
        />
      </div>
    </Section>
  );
}
