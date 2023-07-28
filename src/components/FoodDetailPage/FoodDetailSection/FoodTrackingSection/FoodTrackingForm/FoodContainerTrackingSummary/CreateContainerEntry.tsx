import { useState } from "react";
import { defaultContainerFromTracking } from "../../../../../../domain/FoodAmountTracking/containers";
import {
  Container,
  FoodContainerTracking,
} from "../../../../../../types/FoodAmountTracking";
import AddContainerEntryButton from "./AddContainerEntryButton";
import CreateEditContainerForm from "./CreateEditContainerForm";

type Props = {
  onAdd: (containers: Container[]) => void;
  tracking: FoodContainerTracking;
};

export default function CreateContainerEntry({ onAdd, tracking }: Props) {
  const [addingContainer, setAddingContainer] = useState(false);
  if (!addingContainer) {
    return <AddContainerEntryButton onClick={() => setAddingContainer(true)} />;
  }

  const createContainers = async (
    container: Container,
    numContainers: number
  ) => {
    const newContainers: Container[] = Array(numContainers)
      .fill(0)
      .map(() => ({
        ...container,
        id: window.crypto.randomUUID(),
      }));
    onAdd(newContainers);
    setAddingContainer(false);
  };

  return (
    <CreateEditContainerForm
      container={defaultContainerFromTracking(tracking)}
      onCreate={createContainers}
      onCancel={() => setAddingContainer(false)}
    />
  );
}
