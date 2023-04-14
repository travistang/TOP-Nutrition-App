import React from "react";
import Dexie from "dexie";

import Section from "../Section";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import MeasurementDatabase from "../../database/MeasurementDatabase";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import FoodContainerDatabase from "../../database/FoodContainerDatabase";
import DatabaseImportExportRow from "../ExportImportSection/DatabaseImportExportRow";

const databaseList: Dexie[] = [
  ConsumptionDatabase,
  MeasurementDatabase,
  ExerciseDatabase,
  FoodContainerDatabase,
];

export default function ExportImportSection() {
  return (
    <Section label="Import / Export database">
      <div className="grid grid-cols-2 py-2 gap-y-2 items-center">
        {databaseList.map((database) => (
          <DatabaseImportExportRow database={database} key={database.name} />
        ))}
      </div>
    </Section>
  );
}
