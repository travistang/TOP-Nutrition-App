import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Header() {
  return (
    <header className="h-14 px-2 flex items-center bg-gray-200">
      <FontAwesomeIcon icon="plate-wheat" className="mr-2" />
      Nutrition Tracker
    </header>
  )
}