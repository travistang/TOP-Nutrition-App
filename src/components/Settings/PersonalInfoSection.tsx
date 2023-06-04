import React from "react";
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
import SmallNotice from "../SmallNotice";

const enumToOptions = (
  enumObject: typeof Gender | typeof PhysicalActivityLevel
) => {
  return Object.values(enumObject).map((gender) => ({
    label: gender,
    value: gender,
  }));
};

export default function PersonalInfoSection() {
  const [personalInfo, setPersonalInfo] =
    useRecoilState<PersonalInfo>(personalInfoAtom);
  const { age, height, gender, pal } = personalInfo;
  const onChange =
    <K extends keyof PersonalInfo>(field: K) =>
    (value: PersonalInfo[K]) => {
      setPersonalInfo({ ...personalInfo, [field]: value });
    };
  return (
    <Section label="Personal information">
      <div className="grid grid-cols-6 gap-2 pt-2">
        <NumberInput
          label="Age"
          value={age}
          onChange={onChange("age")}
          className="col-span-3"
        />
        <NumberInput
          label="Height (cm)"
          value={height}
          onChange={onChange("height")}
          className="col-span-3"
        />
        <SelectInput
          label="Gender"
          className="col-span-2"
          value={gender}
          onSelect={(v) => onChange("gender")(v as Gender)}
          options={enumToOptions(Gender)}
        />
        <SelectInput
          label="Physical Activity Level"
          className="col-span-4"
          value={pal}
          onSelect={(v) => onChange("pal")(v as PhysicalActivityLevel)}
          options={enumToOptions(PhysicalActivityLevel)}
        />
        <SmallNotice className="col-span-full" icon="info-circle">
          Data will be stored locally for calculating your maintenance calories.
        </SmallNotice>
        <CurrentWeightInfo />
      </div>
    </Section>
  );
}
