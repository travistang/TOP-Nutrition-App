import React, { useContext } from 'react';
import TabSelectInput, { Option } from '../../Input/TabSelectInput';
import { newSetContext, NewSetOption } from './NewSetContext';

const selectOptions: Option<NewSetOption>[] = [
  {
    text: "No",
    icon: 'times-circle',
    value: NewSetOption.None,
  },
  {
    text: "Dropset",
    icon: 'arrows-down-to-line',
    value: NewSetOption.Dropset,
  },
  {
    text: "Superset",
    icon: 'bolt',
    value: NewSetOption.Superset,
  },
]

export default function NewSetToggle() {
  const { newSetOption, setNewSetOption } = useContext(newSetContext);
  return (
    <div className="w-full mt-4">
      <TabSelectInput
        label="Add a new set?"
        options={selectOptions}
        selected={newSetOption}
        onSelect={setNewSetOption}
      />
    </div>
  )
}