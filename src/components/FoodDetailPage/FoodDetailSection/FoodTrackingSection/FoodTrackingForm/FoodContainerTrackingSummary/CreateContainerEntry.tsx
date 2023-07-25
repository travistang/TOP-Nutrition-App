import React, { useState } from "react";
import AddContainerEntryButton from "./AddContainerEntryButton";
import CreateEditContainerForm from "./CreateEditContainerForm";
import { FoodContainerTracking } from "../../../../../../types/FoodAmountTracking";

type Props = {
  tracking: FoodContainerTracking;
};

export default function CreateContainerEntry({ tracking }: Props) {
  const [addingContainer, setAddingContainer] = useState(false);
  if (!addingContainer) {
    return <AddContainerEntryButton onClick={() => setAddingContainer(true)} />;
  }

  return (
    <CreateEditContainerForm
      tracking={tracking}
      onCreate={console.log}
      onCancel={() => setAddingContainer(false)}
    />
  );
}
