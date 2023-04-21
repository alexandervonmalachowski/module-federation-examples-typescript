import React, { useEffect, useRef, useState } from "react";

import { useAsyncError } from "../..//hooks/useAsyncError";
import { importRemote } from "../../utils/load-remote";

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

  return <div id="remote-vue" ref={(element) => (ref.current = element)} />;
};

export default RemoteVue;
