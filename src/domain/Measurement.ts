import toast from "react-hot-toast";
import MeasurementDatabase, {
  MeasurementRecord,
} from "../database/MeasurementDatabase";
import { Measurement } from "../types/Measurement";

const createEditRecord = async (
  record: Measurement & Partial<MeasurementRecord>
) => {
  try {
    if (await MeasurementDatabase.isUnitMismatch(record)) {
      toast.error("Unit mismatch with existing record!");
      return;
    }
    const isEditing = !!record.id;
    if (isEditing) {
      await MeasurementDatabase.edit(record.id!, record as MeasurementRecord);
      toast.success("Measurement updated");
    } else {
      await MeasurementDatabase.add(record);
      toast.success("Measurement recorded");
    }
    return true;
  } catch {
    toast.error("Failed to record measurement!");
    return false;
  }
};

const removeRecord = async (id: string) => {
  try {
    await MeasurementDatabase.remove(id);
    toast.success("Measurement removed");
    return true;
  } catch {
    toast.error("Failed to remove measurement");
    return false;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createEditRecord,
  removeRecord,
};
