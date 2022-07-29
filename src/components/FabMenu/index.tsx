import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useRecoilState } from 'recoil';
import { fabMenuAtom } from '../../atoms/FabMenuAtom';
import { createEditRecordAtom } from '../../atoms/CreateEditRecordAtom';

type Props = {
  text: string;
  icon: IconProp;
  onClick: () => void;
}
function FabMenuItem({ text, icon, onClick }:Props) {
  return (
    <div onClick={onClick} className='flex flex-row justify-end items-center gap-2 flex-nowrap px-4'>
      {text}
      <FontAwesomeIcon icon={icon} className="rounded-full bg-blue-500 p-2 h-8 w-8 items-center justify-center" />
    </div>
  )
}

export default function FabMenu() {
  const [createEditRecord, setCreateEditRecord] =
    useRecoilState(createEditRecordAtom);
  const [{ fabMenuOpened }, setFabMenuOpened] = useRecoilState(fabMenuAtom);
  if (!fabMenuOpened) return null;

  const closeFabMenu = () => setFabMenuOpened({ fabMenuOpened: false });
  return (
    <div onClick={closeFabMenu} className='backdrop-blur-sm fixed inset-0 z-40 flex flex-col justify-end gap-2 pb-20'>
      <FabMenuItem onClick={console.log} text="Add exercise set" icon="dumbbell" />
      <FabMenuItem onClick={() => setCreateEditRecord({ ...createEditRecord, modalOpened: true })} text="Add consumption" icon="hamburger" />
    </div>
  )
}