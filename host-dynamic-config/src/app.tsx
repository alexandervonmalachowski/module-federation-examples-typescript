import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { CssLoader } from "./components/css-loader/css-loader";
import {
  DynamicRecursiveComponent,
  DynamicRecursiveComponentProps,
} from "./components/dynamic-recursive-component/dynamic-recursive-component";
import { getDynamicRecursiveRouteProps } from "./components/dynamic-recursive-route/dynamic-recursive-route";
import ErrorBoundary from "./components/error-boundry/error-boundry";
import {
  DynamicHostConfig,
  useDynamicHostConfig,
} from "./hooks/useDynamicHostConfig";
import Home from "./pages";
import RemoteVue from "./pages/remote-vue/remote-vue";

const AppLayout = ({
  layout,
}: {
  layout: DynamicRecursiveComponentProps[];
}) => {
  return (
    <>
      {layout?.map((component) => (
        <DynamicRecursiveComponent
          key={`${component.scope}_${component.module}`}
          {...component}
        />
      ))}
    </>
  );
};

const App = () => {
  const { config, status } = useDynamicHostConfig();

  return (
    <>
      <ErrorBoundary>
        <CssLoader />
      </ErrorBoundary>
      {status === "success" && config && (
        <RouterProvider router={router(config)} />
      )}
    </>
  );
};

const router = (config: DynamicHostConfig) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout layout={config.layout} />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/remote-vue"
          element={
            <ErrorBoundary>
              <RemoteVue />
            </ErrorBoundary>
          }
        />
        {config.routes.map((route) => (
          <Route
            key={`${route.path}_${route.title}`}
            {...getDynamicRecursiveRouteProps(route)}
          />
        ))}
      </Route>
    )
  );
export default App;
