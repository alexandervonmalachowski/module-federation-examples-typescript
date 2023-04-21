import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./app";

const root = createRoot(
  document.getElementById("host-dynamic-promise") as HTMLElement
);
root.render(<RouterProvider router={router} />);
