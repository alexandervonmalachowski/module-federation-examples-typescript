import "remote_a/global_css";

import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  useOutlet,
} from "react-router-dom";
const Layout = lazy(() => import("remote_a/layout"));
const TopNavigation = lazy(() => import("remote_a/top_navigation"));
const NotFoundB = lazy(() => import("remote_b/not_found"));
const RemoteB = lazy(() => import("remote_b/remote_b"));
const AboutRemoteB = lazy(() => import("remote_b/about"));
const CountProvider = lazy(() => import("remote_a/count_provider"));

import { DotPulse } from "./components/dot-pulse/dot.pulse";
import ErrorBoundary from "./components/error-boundry/error-boundry";
import Home from "./pages";
import NotFountB from "./pages/not-found";

const AppLayout = () => {
  const outlet = useOutlet();
  return (
    <ErrorBoundary>
      <Suspense fallback={<DotPulse />}>
        <TopNavigation />
        <CountProvider>
          <Layout>{outlet}</Layout>
        </CountProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        }
      />
      <Route path="/remote-b" element={<Outlet />}>
        <Route
          path="/remote-b/"
          element={
            <ErrorBoundary>
              <RemoteB />
            </ErrorBoundary>
          }
        />
        <Route
          path="/remote-b/about"
          element={
            <ErrorBoundary>
              <AboutRemoteB />
            </ErrorBoundary>
          }
        />
        <Route
          path="/remote-b/*"
          element={
            <ErrorBoundary>
              <NotFoundB />
            </ErrorBoundary>
          }
        />
      </Route>
      <Route path="/*" element={<NotFountB />} />
    </Route>
  )
);
export default router;
