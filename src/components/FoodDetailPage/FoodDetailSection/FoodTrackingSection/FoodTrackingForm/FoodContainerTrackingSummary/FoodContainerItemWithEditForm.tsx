import { useContext, useState } from "react";
import {
  Container,
  FoodAmountTrackingType,
} from "../../../../../../types/FoodAmountTracking";
import { foodDetailContext } from "../../../../FoodDetailContext";
import CreateEditContainerForm from "./CreateEditContainerForm";
import FoodContainerItem from "./FoodContainerItem";

type Props = {
  container: Container;
  onUpdate?: (newData: Container) => void;
};
export default function FoodContainerItemWithEditForm({
  container,
  onUpdate,
}: Props) {
  const foodDetails = useContext(foodDetailContext);
  const [editing, setEditing] = useState(false);
  const readonly = !onUpdate;
  if (foodDetails.amountTracking?.type !== FoodAmountTrackingType.Container)
    return null;

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
      container={container}
    />
  );
}
