import classNames from "classnames";
import { useLiveQuery } from "dexie-react-hooks";
import toast from "react-hot-toast";
import FoodContainerDatabase from "../../../../database/FoodContainerDatabase";
import EmptyNotice from "../../../EmptyNotice";
import QRScanner from "../../../QRScanner";
import Section from "../../../Section";
import FoodContainerSelectorItem from "./FoodContainerSelectorItem";

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
  const containers = useLiveQuery(() => FoodContainerDatabase.getAll());
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
  const hasNoContainers = !containers?.length;
  const sectionTitle =
    selectedContainersId.length === 0
      ? "Selected containers"
      : `Selected containers (${selectedContainersId.length})`;
  const toggleSelectionByQrCode = async (code: string) => {
    const containerExists = !!containers?.find((container) => container.identifier === code);
    if (!containerExists) {
      toast.error("Unrecognized container");
      return;
    }
    const newSelectedIds = Array.from(new Set([...selectedContainersId, code]));
    onUpdateSelection(newSelectedIds);
  };
  return (
    <Section
      label={sectionTitle}
      headerComponent={
        !hasNoContainers && (
          <QRScanner
            onQrCodeDetected={toggleSelectionByQrCode}
            modalMessage="Toggle container selection by scanning its QR code"
            modalLabel="Scan container QR Code"
          />
        )
      }
      className={classNames("flex flex-col max-h-64 gap-2", className)}
    >
      <div className="flex-1 min-h-[36px] overflow-y-auto py-2 flex flex-col items-stretch">
        {hasNoContainers && <EmptyNotice message="No registered containers" />}
        {containers?.map((container) => (
          <FoodContainerSelectorItem
            key={container.identifier}
            container={container}
            selected={selectedContainersId.includes(container.identifier)}
            onSelect={() => toggleSelection(container.identifier)}
          />
        ))}
      </div>
    </Section>
  );
}
