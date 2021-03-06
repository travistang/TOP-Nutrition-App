import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faHamburger,
  faLineChart,
  faList,
  faPen,
  faPlateWheat,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
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
import { BrowserTracing } from "@sentry/tracing";

library.add(
  faPen,
  faPlateWheat,
  faArrowRight,
  faTrophy,
  faHamburger,
  faLineChart,
  faList
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
