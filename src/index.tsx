import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import "dexie-export-import";
import { RecoilRoot } from "recoil";
import annotationPlugin from 'chartjs-plugin-annotation';
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
import { loadIcons } from "./setup/icon";

loadIcons();

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
  BarElement,

  annotationPlugin,
);

Sentry.init({
  dsn: "https://fa8fcf1cdbac418a9132f639c47dc5fe@o541235.ingest.sentry.io/6587922",
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  denyUrls: [/localhost/i, /127\.0\.0\.1/i],
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
