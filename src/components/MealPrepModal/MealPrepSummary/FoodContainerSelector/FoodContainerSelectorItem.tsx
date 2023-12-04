import { FoodContainer } from "../../../../types/FoodContainer";
import FoodContainerOverview from "../../../FoodContainers/FoodContainerOverview";
import CheckboxInput from "../../../Input/CheckboxInput";

type Props = {
  selected?: boolean;
  container: FoodContainer;
  onSelect: () => void;
};
export default function FoodContainerSelectorItem({
  container,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-2" onClick={onSelect}>
      <FoodContainerOverview foodContainer={container} className="flex-1" />
      <CheckboxInput
        onCheck={onSelect}
        className="w-16 flex-shrink-0 px-2"
        selected={selected ?? false}
      />
    </div>
  );
}
