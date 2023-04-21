import React from "react";

import { DynamicComponent } from "../components/dynamic-component/dynamic-component";
import ErrorBoundary from "../components/error-boundry/error-boundry";
import styles from "./_home.module.css";

const Page = () => {
  return (
    <div className={styles.home}>
      <ErrorBoundary>
        <DynamicComponent
          url={"http://localhost:3005"}
          scope={"remote_c"}
          module={"remote_c"}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <DynamicComponent
          url={"http://localhost:3002"}
          scope={"remote_b"}
          module={"remote_b"}
        />
      </ErrorBoundary>
    </div>
  );
};

export default Page;
