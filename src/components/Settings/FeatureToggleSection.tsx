import React from 'react';
import { useRecoilState } from 'recoil';
import { DEFAULT_FEATURE_TOGGLE, FeatureToggle, featureToggleAtom } from '../../atoms/FeatureToggleAtom';
import CheckboxInput from '../Input/CheckboxInput';
import Section from '../Section';

const FeatureToggleMap: Record<keyof FeatureToggle, string> = {};

export default function FeatureToggleSection() {
  const [featureToggle, setFeatureToggle] = useRecoilState(featureToggleAtom);
  const hasNoFeatureToggles = Object.keys(DEFAULT_FEATURE_TOGGLE).length === 0;
  return (
    <Section label="Feature toggles" className="gap-2">
      {hasNoFeatureToggles && (
        <span className="self-center text-xs py-4">
          There are no feature toggles at the moment
        </span>
      )}
      {Object.entries(FeatureToggleMap).map(([key, title]) => (
          <CheckboxInput
            label={title as string}
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