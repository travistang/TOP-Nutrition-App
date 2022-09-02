import React, { useState } from 'react';
import TextInput from '../Input/TextInput';
import Section from '../Section';

type ServerConnection = {
  topDWHUrl: string;
}
export default function ServerConnectionSection() {
  const [config,] = useState<ServerConnection>({ topDWHUrl: '' });

  return (
    <Section label="Server connections">
      <div className="grid grid-cols-6 gap-2 pt-2">
        <TextInput
        value={config.topDWHUrl}
        onChange={console.log}
        label="TOP Data-warehouse URL" />
      </div>
    </Section>
  )
}