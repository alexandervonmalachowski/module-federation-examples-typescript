import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import About from "./pages/about";
import Notfound from "./pages/not-found";
import Home from "./pages/remote-c";

const CountProvider = lazy(() => import("remote_a/count_provider"));

const App = () => (
  <>
    <Suspense fallback={<span>Loading...</span>}>
      <CountProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </CountProvider>
    </Suspense>
  </>
);

export default App;
