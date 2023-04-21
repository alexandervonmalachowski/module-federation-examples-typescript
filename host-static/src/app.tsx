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
const NotFound = lazy(() => import("remote_b/not_found"));
const RemoteB = lazy(() => import("remote_b/remote_b"));
const AboutRemoteB = lazy(() => import("remote_b/about"));
const RemoteNext = lazy(() => import("remote_next/home"));

import { DotPulse } from "./components/dot-pulse/dot.pulse";
import ErrorBoundary from "./components/error-boundry/error-boundry";
import Home from "./pages";
import RemoteVue from "./pages/remote-vue/remote-vue";

const AppLayout = () => {
  const outlet = useOutlet();
  return (
    <Suspense fallback={<DotPulse />}>
      <TopNavigation />
      <Layout>{outlet}</Layout>
    </Suspense>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/remote-b" element={<Outlet />}>
        <Route path="/remote-b/" element={<RemoteB />} />
        <Route path="/remote-b/about" element={<AboutRemoteB />} />
        <Route path="/remote-b/*" element={<NotFound />} />
      </Route>
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
          <ErrorBoundary>
            <Suspense fallback={<DotPulse />}>
              <RemoteNext />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Route>
  )
);
export default router;
