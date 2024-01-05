import Button, { ButtonStyle } from "../../../Input/Button";

type Props = {
  isFormValid?: boolean;
  onConfirm: () => void;
  onRemove?: () => void;
  onClose: () => void;
};
export default function CreateExerciseChallengeButtonRow({
  isFormValid,
  onConfirm,
  onRemove,
  onClose,
}: Props) {
  return (
    <div className="flex flex-row-reverse items-center justify-between gap-2 col-span-full">
      <div className="flex items-center gap-2">
        <Button
          onClick={onClose}
          buttonStyle={ButtonStyle.Clear}
          text="Cancel"
          icon="times"
        />
        <Button
          disabled={!isFormValid}
          onClick={onConfirm}
          buttonStyle={ButtonStyle.Block}
          text={onRemove ? "Update" : "Create"}
          icon={onRemove ? "pen" : "plus"}
        />
      </div>
      {onRemove && (
        <Button
          onClick={onRemove}
          buttonStyle={ButtonStyle.BlockDanger}
          text="Remove"
          icon="times"
        />
      )}
    </div>
  );
}
