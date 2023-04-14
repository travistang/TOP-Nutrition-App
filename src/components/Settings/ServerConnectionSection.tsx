import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import {
  serverConnectionAtom,
  ServerConnectionConfig,
} from "../../atoms/ServerConnectionAtom";
import TextInput from "../Input/TextInput";
import Section from "../Section";

export default function ServerConnectionSection() {
  const [config, setConfig] = useRecoilState(serverConnectionAtom);

  const updateField =
    <T extends keyof ServerConnectionConfig>(field: T) =>
    (value: ServerConnectionConfig[T]) => {
      setConfig({
        ...config,
        [field]: value,
      });
    };

  return (
    <Section label="Server connections">
      <div className="grid grid-cols-6 gap-2 pt-2">
        <span className="col-span-full text-xs my-2">
          <FontAwesomeIcon icon="info-circle" className="pr-2" />
          You do not need to fill out this section for this app to function. The
          information in this part is for sharing the data stored in this app to
          other Travis' Over-engineering Project (TOP) for backup and analysis
          purposes.
        </span>
        <TextInput
          value={config.topNutritionServiceUrl}
          className="col-span-full"
          onChange={updateField("topNutritionServiceUrl")}
          label="TOP Nutrition Service URL"
        />
      </div>
    </Section>
  );
}
