import React from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import ErrorBoundary from "./components/error-boundry/error-boundry";

const root = createRoot(
  document.getElementById("host-dynamic-config") as HTMLElement
);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
