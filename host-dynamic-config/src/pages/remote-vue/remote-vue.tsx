import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import { useAsyncError } from "../..//hooks/useAsyncError";
import { DotPulse } from "../../components/dot-pulse/dot-pulse";
import { importRemote } from "../../utils/load-remote";
import styles from "./_remote_vue.module.css";

const RemoteVue = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const throwError = useAsyncError();

  useEffect(() => {
    if (ref.current && !loaded) {
      importRemote({
        url: "http://localhost:3004",
        scope: "remote_vue",
        module: "vue_bootstrap",
        onError: throwError,
      }).then((bootstrap) => {
        const { mount } = bootstrap as {
          mount: (element: HTMLDivElement | null) => void;
        };
        mount(ref.current);
        setLoaded(true);
      });
    }
  }, [loaded, throwError]);

  return (
    <>
      {!loaded && <DotPulse />}
      <div
        className={classnames(styles["remote-vue"], {
          [styles.loading]: !loaded,
        })}
        id="remote-vue"
        ref={(element) => (ref.current = element)}
      />
    </>
  );
};

export default RemoteVue;
