import React from 'react';
import { useRecoilState } from 'recoil';
import { fabMenuAtom } from '../../atoms/FabMenuAtom';
import Fab from '../Fab';

export default function MainFabButton() {
  const [{ fabMenuOpened }, setFabMenuOpened] = useRecoilState(fabMenuAtom);

  const onClick = () => {
    setFabMenuOpened({ fabMenuOpened: !fabMenuOpened });
  }

  const icon = fabMenuOpened ? "times" : "pen";

  return (
    <Fab
      icon={icon}
      onClick={onClick}
    />
  )
}