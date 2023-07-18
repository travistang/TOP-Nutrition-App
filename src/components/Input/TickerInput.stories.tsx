import { useArgs } from "@storybook/client-api";
import type { Meta } from "@storybook/react";

import TickerInput from "./TickerInput";

const meta: Meta<typeof TickerInput> = {
  title: "Input/TickerInput",
  component: TickerInput,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    value: 42,
    integer: true,
    min: 30,
    max: 50,
    label: "A ticker",
  },
};

export default meta;

export const Main = (args: Meta<typeof TickerInput>["args"]) => {
  const [, updateArgs] = useArgs();

  return (
    <TickerInput
      {...(args as any)}
      onChange={(value) => updateArgs({ value })}
    />
  );
};
