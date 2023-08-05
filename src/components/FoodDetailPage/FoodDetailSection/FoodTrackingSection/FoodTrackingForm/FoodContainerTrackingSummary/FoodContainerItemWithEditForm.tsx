import { useState } from "react";
import { Container } from "../../../../../../types/FoodAmountTracking";
import CreateEditContainerForm from "./CreateEditContainerForm";
import FoodContainerItem from "./FoodContainerItem";

type Props = {
  container: Container;
  onUpdate?: (newData: Container) => void;
  onDelete?: (id: string) => void;
};
export default function FoodContainerItemWithEditForm({
  container,
  onUpdate,
  onDelete,
}: Props) {
  const [editing, setEditing] = useState(false);
  const readonly = !onUpdate;

  if (!editing || readonly) {
    return (
      <FoodContainerItem
        container={container}
        onEdit={readonly ? undefined : () => setEditing(true)}
      />
    );
  }

  const onUpdateContainerInfo = async (data: Container, _: number) => {
    onUpdate(data);
    setEditing(false);
  };
  return (
    <CreateEditContainerForm
      onCancel={() => setEditing(false)}
      onCreate={onUpdateContainerInfo}
      onDelete={onDelete ? () => onDelete?.(container.id) : undefined}
      container={container}
    />
  );
}
