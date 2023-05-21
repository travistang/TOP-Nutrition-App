import React from "react";
import { Food } from "../types/Food";
import ConsumptionDatabase from "../database/ConsumptionDatabase";
import ImageViewer from "./ImageViewer";
import { useLiveQuery } from "dexie-react-hooks";

type Props = {
  className?: string;
  consumption: Food;
};
export default function ConsumptionItemImage({
  className,
  consumption,
}: Props) {
  const foodDetails = useLiveQuery(() => {
    return ConsumptionDatabase.getOrCreateFoodDetailByRecord(consumption);
  }, [consumption]);

  return (
    <ImageViewer className={className} image={foodDetails?.image ?? null} />
  );
}
