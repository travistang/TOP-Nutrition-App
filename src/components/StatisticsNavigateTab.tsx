import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tab, { TabConfig } from './Tab';

const LabelPathMapping: Record<string, string> = {
    'Nutrition': '/stats',
    'Workouts': '/stats/workouts',
    'Measurements': '/stats/measurements',
};
export default function StatisticsNavigateTab() {
    const navigate = useNavigate();
    const location = useLocation();
    const isTagSelected = (config: TabConfig) => LabelPathMapping[config.label ?? ''] === location.pathname;
    return (
        <Tab className="sticky top-0 z-20" options={Object.entries(LabelPathMapping).map(([label, path]) => ({
            label, onClick: () => navigate(path)
        }))}
            selected={isTagSelected}
        />
    );
}