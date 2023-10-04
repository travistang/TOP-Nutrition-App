import { useRecoilState } from "recoil";
import { createEditAchievementAtom } from "../../atoms/CreateEditAchievementAtom";
import Modal from "../Modal";

export default function AchievementModal() {
  const [{ achievement }, setState] = useRecoilState(createEditAchievementAtom);
  const closeModal = () => setState({ achievement: null });
  const isEditing = !!achievement?.id;
  return (
    <Modal
      opened={!!achievement}
      onClose={closeModal}
      label={isEditing ? "Edit achievement" : "Create achievement"}
    >
      WIP
    </Modal>
  );
}
