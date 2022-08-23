import React from 'react';
import { useRecoilState } from 'recoil';
import { createEditRecordAtom } from '../../atoms/CreateEditRecordAtom';
import { fabMenuAtom } from '../../atoms/FabMenuAtom';
import Fab from '../Fab';

export default function MainFabButton() {
  const [createEditRecord] =
    useRecoilState(createEditRecordAtom);
  const [{ fabMenuOpened }, setFabMenuOpened] = useRecoilState(fabMenuAtom);

  const onClick = () => {
    setFabMenuOpened({ fabMenuOpened: !fabMenuOpened });
  }

  const icon = fabMenuOpened ? "times" : "pen";

  if (createEditRecord.modalOpened) return null;

  return (
    <Fab
      icon={icon}
      onClick={onClick}
    />
  )
}