import React, { Suspense } from "react";
import { useOutlet } from "react-router-dom";

import { DotPulse } from "../dot-pulse/dot-pulse";
import {
  DynamicComponent,
  MemorizedDynamicComponent,
} from "../dynamic-component/dynamic-component";
import ErrorBoundary from "../error-boundry/error-boundry";

export type DynamicRecursiveComponentProps = {
  url: string;
  scope: string;
  module: string;
  shouldMemorize?: boolean;
  showFallback?: boolean;
  hasOutLet?: boolean;
  children?: DynamicRecursiveComponentProps[];
};
export const DynamicRecursiveComponent = ({
  shouldMemorize = false,
  showFallback = true,
  hasOutLet = false,
  children = [],
  ...rest
}: DynamicRecursiveComponentProps) => {
  const outlet = useOutlet();
  const Component = shouldMemorize
    ? MemorizedDynamicComponent
    : DynamicComponent;

  const props = {
    ...rest,
  };

  if (!showFallback) {
    props["fallback"] = "";
  }

  return (
    <ErrorBoundary>
      <Component {...props}>
        {hasOutLet && <Suspense fallback={<DotPulse />}>{outlet}</Suspense>}
        {children.map((child) => (
          <DynamicRecursiveComponent
            key={`${child.scope}_${child.module}`}
            {...child}
          />
        ))}
      </Component>
    </ErrorBoundary>
  );
};
