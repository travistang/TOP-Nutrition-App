import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Gender,
  PersonalInfo,
  PhysicalActivityLevel,
} from "../../types/PersonalInfo";
import NumberInput from "../Input/NumberInput";
import SelectInput from "../Input/SelectInput";
import Section from "../Section";
import { useRecoilState } from "recoil";
import { personalInfoAtom } from "../../atoms/PersonalInfoAtom";
import CurrentWeightInfo from "./CurrentWeightInfo";

export default function PersonalInfoSection() {
  const [personalInfo, setPersonalInfo] =
    useRecoilState<PersonalInfo>(personalInfoAtom);
  const onChange =
    <K extends keyof PersonalInfo>(field: K) =>
    (value: PersonalInfo[K]) => {
      setPersonalInfo({ ...personalInfo, [field]: value });
    };
  console.log({ personalInfo });
  return (
    <Section label="Personal information">
      <div className="grid grid-cols-6 gap-2 pt-2">
        <NumberInput
          label="Age"
          value={personalInfo.age}
          onChange={onChange("age")}
          className="col-span-3"
        />
        <NumberInput
          label="Height (cm)"
          value={personalInfo.height}
          onChange={onChange("height")}
          className="col-span-3"
        />
        <SelectInput
          label="Gender"
          className="col-span-2"
          value={personalInfo.gender}
          onSelect={(v) => onChange("gender")(v as Gender)}
          options={Object.values(Gender).map((gender) => ({
            label: gender,
            value: gender,
          }))}
        />
        <SelectInput
          label="Physical Activity Level"
          className="col-span-4"
          value={personalInfo.pal}
          onSelect={(v) => onChange("pal")(v as PhysicalActivityLevel)}
          options={Object.values(PhysicalActivityLevel).map((pal) => ({
            label: pal,
            value: pal,
          }))}
        />
        <span className="col-span-full text-xs">
          <FontAwesomeIcon icon="info-circle" /> Data will be stored locally for
          calculating your maintenance calories.
        </span>
        <CurrentWeightInfo />
      </div>
    </Section>
  );
}
