import { useLiveQuery } from "dexie-react-hooks";
import ExpiredFoodDetail from "../components/FoodStockDetails/ExpiredFoodDetail";
import FoodDetail from "../components/FoodStockDetails/FoodDetail";
import ConsumptionDatabase, {
  FoodDetails,
} from "../database/ConsumptionDatabase";
import {
  hasExpiredContainers,
  shouldRestock,
} from "../domain/FoodAmountTracking/containers";
import CollapsibleSection from "../components/CollapsibleSection";
import useToggle from "../hooks/useToggle";
import EmptyNotice from "../components/EmptyNotice";
import NumberChip from "../components/NumberChip";
import { useState } from "react";
import EditFoodTrackingModal from "../components/FoodStockDetails/EditFoodTrackingModal";

type FoodStockSection = "expired" | "understocked" | "normal";

const categorizeFood = (
  details: FoodDetails[]
): Record<FoodStockSection, FoodDetails[]> => {
  const understocked = details.filter((detail) =>
    shouldRestock(detail.amountTracking!)
  );
  const expired = details.filter((detail) =>
    hasExpiredContainers(detail.amountTracking!)
  );

  const normal = details.filter((detail) => {
    return (
      !shouldRestock(detail.amountTracking!) &&
      !hasExpiredContainers(detail.amountTracking!)
    );
  });

  return {
    expired,
    normal,
    understocked,
  };
};
export default function FoodStockDetailPage() {
  const [editingFoodTracking, setEditingFoodTracking] =
    useState<FoodDetails | null>(null);
  const { selected, onSelect } = useToggle<FoodStockSection>({
    initialValue: ["normal"],
    multiple: true,
  });
  const foodWithTracking =
    useLiveQuery(() =>
      ConsumptionDatabase.foodDetails
        .filter((detail) => !!detail.amountTracking)
        .toArray()
    ) ?? [];

  const { normal, expired, understocked } = categorizeFood(foodWithTracking);
  const noFoodTracked = !foodWithTracking.length;
  if (noFoodTracked) {
    return (
      <EmptyNotice
        message="No food is being tracked at the moment"
        className="h-full"
      />
    );
  }

  return (
    <div className="flex flex-col items-stretch gap-2">
      <EditFoodTrackingModal
        onClose={() => setEditingFoodTracking(null)}
        foodDetail={editingFoodTracking}
      />
      <CollapsibleSection
        disabled={understocked.length === 0}
        expanded={selected("understocked")}
        onToggleExpand={() => onSelect("understocked")}
        label="Understocked food"
        icon="battery-empty"
        headerComponent={<NumberChip value={understocked.length} />}
      >
        {understocked.map((food) => (
          <FoodDetail
            key={food.id}
            foodDetails={food}
            onClick={() => setEditingFoodTracking(food)}
          />
        ))}
      </CollapsibleSection>
      <CollapsibleSection
        disabled={expired.length === 0}
        expanded={selected("expired")}
        onToggleExpand={() => onSelect("expired")}
        label="Food with expired containers"
        icon="skull-crossbones"
        headerComponent={<NumberChip value={expired.length} />}
      >
        {expired.map((food) => (
          <ExpiredFoodDetail
            key={food.id}
            foodDetails={food}
            onClick={() => setEditingFoodTracking(food)}
          />
        ))}
      </CollapsibleSection>
      <CollapsibleSection
        expanded={selected("normal")}
        onToggleExpand={() => onSelect("normal")}
        label="Other tracked food"
        icon="hamburger"
        headerComponent={<NumberChip value={normal.length} />}
      >
        {normal.map((food) => (
          <FoodDetail
            key={food.id}
            foodDetails={food}
            onClick={() => setEditingFoodTracking(food)}
          />
        ))}
      </CollapsibleSection>
    </div>
  );
}
