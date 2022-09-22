import React from 'react';
import ExportImportSection from '../components/Settings/ExportImportSection';
import FeatureToggleSection from '../components/Settings/FeatureToggleSection';
import PersonalInfoSection from '../components/Settings/PersonalInfoSection';
import ServerConnectionSection from '../components/Settings/ServerConnectionSection';

export default function SettingsPage() {
  return (
    <div className="flex flex-col overflow-y-auto flex-1 gap-2 items-stretch pb-24">
      <PersonalInfoSection />
      <ExportImportSection />
      <FeatureToggleSection />
      <ServerConnectionSection />
    </div>
  );
}