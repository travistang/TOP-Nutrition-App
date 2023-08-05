import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import CollapsibleSection from "../components/CollapsibleSection";
import EmptyNotice from "../components/EmptyNotice";
import EditFoodTrackingModal from "../components/FoodStockDetails/EditFoodTrackingModal";
import ExpiredFoodDetail from "../components/FoodStockDetails/ExpiredFoodDetail";
import FoodDetail from "../components/FoodStockDetails/FoodDetail";
import NumberChip from "../components/NumberChip";
import ConsumptionDatabase, {
  FoodDetails,
} from "../database/ConsumptionDatabase";
import {
  hasExpiredContainers,
  shouldRestock,
} from "../domain/FoodAmountTracking/containers";
import useToggle from "../hooks/useToggle";

type FoodStockSection = "expired" | "understocked" | "normal";
const SECTION_CONFIGS: Record<
  FoodStockSection,
  {
    label: string;
    icon: IconProp;
    ItemComponent: React.FC<{ onClick: () => void; foodDetails: FoodDetails }>;
  }
> = {
  understocked: {
    label: "Understocked food",
    icon: "battery-empty",
    ItemComponent: FoodDetail,
  },
  expired: {
    label: "Food with expired containers",
    icon: "skull-crossbones",
    ItemComponent: ExpiredFoodDetail,
  },
  normal: {
    label: "Other tracked food",
    icon: "hamburger",
    ItemComponent: FoodDetail,
  },
};

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

  const foodByCategories = categorizeFood(foodWithTracking);
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
      {(
        Object.entries(SECTION_CONFIGS) as [
          FoodStockSection,
          (typeof SECTION_CONFIGS)[FoodStockSection]
        ][]
      ).map(([section, config]) => (
        <CollapsibleSection
          key={section}
          disabled={foodByCategories[section].length === 0}
          expanded={selected(section)}
          onToggleExpand={() => onSelect(section)}
          label={config.label}
          icon={config.icon}
          headerComponent={
            <NumberChip value={foodByCategories[section].length} />
          }
        >
          {foodByCategories[section].map((food) => (
            <config.ItemComponent
              key={food.id}
              foodDetails={food}
              onClick={() => setEditingFoodTracking(food)}
            />
          ))}
        </CollapsibleSection>
      ))}
    </div>
  );
}
