import React from 'react';
import PersonalInfoSection from '../components/Settings/PersonalInfoSection';

export default function SettingsPage() {
  return (
    <div className="flex flex-col overflow-y-auto flex-1 gap-2 items-stretch">
      <PersonalInfoSection />
    </div>
  );
}