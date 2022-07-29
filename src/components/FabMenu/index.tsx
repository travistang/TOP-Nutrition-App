import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FabMenu() {
  return (
    <div className='backdrop-blur-sm fixed inset-0 z-50 flex flex-col justify-end'>
      <div className='flex flex-row justify-end items-center gap-2 flex-nowrap'>
        Add consumption
        <FontAwesomeIcon icon="dumbbell" className="rounded-full h-12 w-12 items-center justify-center" />
      </div>
      <div className='flex flex-row justify-end items-center gap-2 flex-nowrap'>
        Add exercise set
        <FontAwesomeIcon icon="hamburger" className="rounded-full h-12 w-12 items-center justify-center" />
      </div>
    </div>
  )
}