import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import "dexie-export-import";
import {
  faArrowRight,
  faBezierCurve,
  faClock,
  faCogs,
  faDumbbell,
  faGripLines,
  faHamburger,
  faInfoCircle,
  faLineChart,
  faList,
  faPen,
  faPersonWalking,
  faPlateWheat,
  faRobot,
  faRulerHorizontal,
  faSave,
  faSearch,
  faTimes,
  faTrophy,
  faCaretLeft,
  faCaretRight,
  faFileImport,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";

import { BrowserTracing } from "@sentry/tracing";
import { RecoilRoot } from "recoil";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  BarController,
} from "chart.js";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

library.add(
  faCogs,
  faDumbbell,
  faPen,
  faPlateWheat,
  faArrowRight,
  faTrophy,
  faHamburger,
  faLineChart,
  faList,
  faDumbbell,
  faTimes,
  faGripLines,
  faBezierCurve,
  faRobot,
  faPersonWalking,
  faSearch,
  faRulerHorizontal,
  faClock,
  faInfoCircle,
  faSave,
  faCaretLeft,
  faCaretRight,
  faTrophy,
  faFileImport,
  faFileExport,
);
ChartJS.register(
  LineController,
  BarController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement
);

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
