import React, { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  useOutlet,
} from "react-router-dom";

import { DotPulse } from "./components/dot-pulse/dot-pulse";
import {
  DynamicComponent,
  MemorizedDynamicComponent,
} from "./components/dynamic-component/dynamic-component";
import ErrorBoundary from "./components/error-boundry/error-boundry";
import Home from "./pages";
import RemoteVue from "./pages/remote-vue/remote-vue";
import { importRemote } from "./utils/load-remote";

importRemote({
  url: "http://localhost:3001",
  scope: "remote_a",
  module: "global_css",
});

const AppLayout = () => {
  const outlet = useOutlet();
  return (
    <Suspense fallback={<DotPulse />}>
      <ErrorBoundary>
        <MemorizedDynamicComponent
          url="http://localhost:3001"
          scope="remote_a"
          module="top_navigation"
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <MemorizedDynamicComponent
          url="http://localhost:3001"
          scope="remote_a"
          module="layout"
        >
          {outlet}
        </MemorizedDynamicComponent>
      </ErrorBoundary>
    </Suspense>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/remote-vue"
        element={
          <ErrorBoundary>
            <Suspense fallback={<DotPulse />}>
              <RemoteVue />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/remote-next"
        element={
          <DynamicComponent
            url={"http://localhost:3000/_next/static/chunks"}
            scope={"remote_next"}
            module={"home"}
          />
        }
      />
      <Route path="/remote-b" element={<Outlet />}>
        <Route
          path="/remote-b/"
          element={
            <DynamicComponent
              url={"http://localhost:3002"}
              scope={"remote_b"}
              module={"remote_b"}
            />
          }
        />
        <Route
          path="/remote-b/about"
          element={
            <DynamicComponent
              url={"http://localhost:3002"}
              scope={"remote_b"}
              module={"about"}
            />
          }
        />
        <Route
          path="/remote-b*"
          element={
            <DynamicComponent
              url={"http://localhost:3002"}
              scope={"remote_b"}
              module={"not_found"}
            />
          }
        />
      </Route>
      <Route
        path="/*"
        element={
          <DynamicComponent
            url={"http://localhost:3002"}
            scope={"remote_b"}
            module={"not_found"}
          />
        }
      />
    </Route>
  )
);
export default router;
