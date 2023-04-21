import React, { lazy, Suspense } from "react";
import { useCountContext } from "remote_a/count_provider";

import { DotPulse } from "../components/dot-pulse/dot.pulse";
import ErrorBoundary from "../components/error-boundry/error-boundry";
import styles from "./_home.module.css";

const RemoteB = lazy(() => import("remote_b/remote_b"));

const Page = () => {
  const { count, setCount } = useCountContext();

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <h1>Home Host</h1>
        <button
          onClick={() => {
            setCount?.(1);
          }}
          type="button"
          className={styles.add}
        >
          Add count
        </button>
        <span>Count is {count}</span>
      </div>
      <ErrorBoundary>
        <Suspense fallback={<DotPulse />}>
          <RemoteB />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Page;
