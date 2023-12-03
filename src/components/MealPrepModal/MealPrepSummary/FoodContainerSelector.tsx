import classNames from "classnames";
import { useLiveQuery } from "dexie-react-hooks";
import FoodContainerDatabase from "../../../database/FoodContainerDatabase";
import EmptyNotice from "../../EmptyNotice";
import FoodContainerOverview from "../../FoodContainers/FoodContainerOverview";
import CheckboxInput from "../../Input/CheckboxInput";
import Section from "../../Section";

type Props = {
  selectedContainersId: string[];
  onUpdateSelection: (selected: string[]) => void;
  className?: string;
};
export default function FoodContainerSelector({
  selectedContainersId,
  onUpdateSelection,
  className,
}: Props) {
  const toggleSelection = (id: string) => {
    const index = selectedContainersId.findIndex((c) => c === id);
    if (index === -1) {
      onUpdateSelection([...selectedContainersId, id]);
    } else {
      const updated = [...selectedContainersId];
      updated.splice(index, 1);
      onUpdateSelection(updated);
    }
  };
  const containers = useLiveQuery(() => FoodContainerDatabase.getAll());
  const hasNoContainers = !containers?.length;
  return (
    <Section
      label="Selected containers"
      className={classNames("flex flex-col max-h-64 gap-2", className)}
    >
      <div className="flex-1 min-h-[36px] overflow-y-auto py-2">
        {hasNoContainers && <EmptyNotice message="No registered containers" />}
        {!hasNoContainers && (
          <span className="text-xs">
            Selected: {selectedContainersId.length}
          </span>
        )}
        {containers?.map((container) => (
          <div
            className="flex gap-2"
            onClick={() => toggleSelection(container.identifier)}
          >
            <FoodContainerOverview
              key={container.identifier}
              foodContainer={container}
              className="flex-1"
            />
            <CheckboxInput
              onCheck={() => toggleSelection(container.identifier)}
              className="w-16 flex-shrink-0 px-2"
              selected={selectedContainersId.includes(container.identifier)}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
