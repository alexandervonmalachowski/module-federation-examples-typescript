import React from "react";
import { Outlet, Route, RouteProps } from "react-router-dom";

import {
  DynamicRecursiveComponent,
  DynamicRecursiveComponentProps,
} from "../dynamic-recursive-component/dynamic-recursive-component";

export type DynamicRecursiveRouteProps = {
  title: string;
  path?: string;
  component?: DynamicRecursiveComponentProps;
  routes?: DynamicRecursiveRouteProps[];
};

export const getDynamicRecursiveRouteProps = (
  route: DynamicRecursiveRouteProps
) => {
  const { component, path, routes, title } = route;
  const props: RouteProps = {
    element: component ? (
      <DynamicRecursiveComponent
        url={component.url}
        scope={component.scope}
        module={component.module}
      />
    ) : (
      <Outlet />
    ),
  };

  if (path) {
    props["path"] = path;
  }

  if (routes) {
    props.children = routes.map((r) => (
      <Route key={`${path}_${title}`} {...getDynamicRecursiveRouteProps(r)} />
    ));
  }

  return props;
};
