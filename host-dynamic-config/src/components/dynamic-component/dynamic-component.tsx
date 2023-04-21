import React, { lazy, Suspense, useMemo } from "react";

import { useAsyncError } from "../../hooks/useAsyncError";
import { importRemote, ImportRemoteOptions } from "../../utils/load-remote";
import { DotPulse } from "../dot-pulse/dot-pulse";

type DynamicComponentProps<TProps> = TProps &
  ImportRemoteOptions & {
    fallback?: JSX.Element;
  };

/**
 * Component for loading remote Components.
 * @param {DynamicComponentProps<TProps>} props
 * @example
 * <ErrorBoundry>
 *  <DynamicComponent
 *    url="http://localhost:3000"
 *    scope="remote_a"
 *    module="top_navigarion"
 *  />
 * </ErrorBoundry>
 *
 */
export const DynamicComponent = <TProps extends Record<string, unknown>>({
  url,
  scope,
  module,
  fallback,
  remoteEntryFileName = "remoteEntry.js",
  bustRemoteEntryCache = true,
  ...props
}: DynamicComponentProps<TProps>) => {
  const throwError = useAsyncError();
  const Component = lazy(() =>
    importRemote({
      url,
      scope,
      module,
      remoteEntryFileName,
      bustRemoteEntryCache,
      onError: throwError,
    })
  );

  return (
    <Suspense fallback={fallback ?? <DotPulse />}>
      <Component {...props} />
    </Suspense>
  );
};
/**
 * Component for loading remote Components that is memorized.
 * @param {DynamicComponentProps<TProps>} props
 * @example
 * <ErrorBoundry>
 *  <MemorizedDynamicComponent
 *    url="http://localhost:3000"
 *    scope="remote_a"
 *    module="top_navigarion"
 *  />
 * </ErrorBoundry>
 *
 */
export const MemorizedDynamicComponent = <
  TProps extends Record<string, unknown>
>({
  url,
  scope,
  module,
  fallback,
  remoteEntryFileName = "remoteEntry.js",
  bustRemoteEntryCache = true,
  ...props
}: DynamicComponentProps<TProps>) => {
  const throwError = useAsyncError();

  const Component = useMemo(
    () =>
      lazy(() =>
        importRemote({
          url,
          scope,
          module,
          remoteEntryFileName,
          bustRemoteEntryCache,
          onError: throwError,
        })
      ),
    [url, scope, module, remoteEntryFileName, bustRemoteEntryCache, throwError]
  );

  return (
    <Suspense fallback={fallback ?? <DotPulse />}>
      <Component {...props} />
    </Suspense>
  );
};
