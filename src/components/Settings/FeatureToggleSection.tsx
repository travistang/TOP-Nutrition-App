import React from 'react';
import { useRecoilState } from 'recoil';
import { FeatureToggle, featureToggleAtom } from '../../atoms/FeatureToggleAtom';
import CheckboxInput from '../Input/CheckboxInput';
import Section from '../Section';

const FeatureToggleMap: Record<keyof FeatureToggle, string> = {
  stepExerciseWorkoutForm: 'Use old exercise form',
};

export default function FeatureToggleSection() {
  const [featureToggle, setFeatureToggle] = useRecoilState(featureToggleAtom);

  return (
    <Section label="Feature toggles">
      {Object.entries(FeatureToggleMap).map(([key, title]) => (
          <CheckboxInput
            label={title}
            key={key}
            selected={featureToggle[key as keyof FeatureToggle]}
            onCheck={() => setFeatureToggle({
            ...featureToggle,
            [key]: !featureToggle[key as keyof FeatureToggle]
          })}
          />
      ))}
    </Section>
  )
}