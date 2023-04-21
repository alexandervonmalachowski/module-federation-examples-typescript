import { useEffect, useState } from "react";

import { DynamicRecursiveComponentProps } from "../components/dynamic-recursive-component/dynamic-recursive-component";
import { DynamicRecursiveRouteProps } from "../components/dynamic-recursive-route/dynamic-recursive-route";
import { useAsyncError } from "./useAsyncError";

export type DynamicHostConfig = {
  layout: DynamicRecursiveComponentProps[];
  routes: DynamicRecursiveRouteProps[];
};

export const useDynamicHostConfig = () => {
  const [config, setConfig] = useState<DynamicHostConfig>();
  const [status, setStatus] = useState<
    "success" | "fail" | "loading" | "initial"
  >("initial");
  const throwError = useAsyncError();

  useEffect(() => {
    if (status === "initial") {
      setStatus("loading");
      fetch("http://localhost:3001/host.config.json")
        .then((resp) => {
          return resp.json();
        })
        .then((config) => {
          setStatus("success");
          setConfig(config);
        })
        .catch((err) => {
          setStatus("fail");
          throwError(new Error(err));
        });
    }
  }, [status, throwError]);

  return { config, status };
};
