import type { Preview } from "@storybook/react";
import { loadIcons } from "../src/setup/icon";

import "./index.css";

loadIcons();
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
