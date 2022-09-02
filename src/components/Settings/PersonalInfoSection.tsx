import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Gender, PersonalInfo } from '../../types/PersonalInfo';
import NumberInput from '../Input/NumberInput';
import SelectInput from '../Input/SelectInput';
import Section from '../Section';
import * as PersonalInfoDomain from '../../domain/PersonalInfo';
import Button from '../Input/Button';
import toast from 'react-hot-toast';

export default function PersonalInfoSection() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(PersonalInfoDomain.get() ?? PersonalInfoDomain.DEFAULT_PERSONAL_INFO);

  const onChange = <K extends keyof PersonalInfo>(field: K) => (value: PersonalInfo[K]) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  }

  const onSave = () => {
    PersonalInfoDomain.set(personalInfo);
    toast.success("Changes saved");
  }

  return (
    <Section label="Personal information">
      <div className="grid grid-cols-6 gap-2 pt-2">

        <NumberInput label="Age" value={personalInfo.age} onChange={onChange('age')} className="col-span-3" />
        <NumberInput label="Height (cm)" value={personalInfo.height} onChange={onChange('height')} className="col-span-3" />
        <SelectInput
          label="Gender"
          className="col-span-full"
          value={personalInfo.gender}
          onSelect={v => onChange('gender')(v as Gender)}
          options={Object.values(Gender)
            .map(gender => ({ label: gender, value: gender }))}
        />
        <span className="col-span-full text-xs">
          <FontAwesomeIcon icon="info-circle" /> Data will be stored locally for calculating your maintenance calories.
        </span>
        <Button
          className="px-2 col-span-2 col-end-7 h-12 gap-1"
          onClick={onSave}
          text="Save"
          icon="save"
          textClassName='child:fill-gray-200'
        />
      </div>
    </Section>
  )
}