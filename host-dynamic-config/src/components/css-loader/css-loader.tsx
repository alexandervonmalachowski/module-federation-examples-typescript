import React, { ReactNode, useEffect, useState } from "react";

import { useAsyncError } from "../../hooks/useAsyncError";
import { importRemote } from "../../utils/load-remote";

export const CssLoader = ({ children }: { children?: ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const throwError = useAsyncError();

  useEffect(() => {
    if (!loaded) {
      importRemote({
        url: "http://localhost:3001",
        scope: "remote_a",
        module: "global_css",
        onError: throwError,
      }).then(() => {
        setLoaded(true);
      });
    }
  }, [loaded, throwError]);

  return <>{children}</>;
};
