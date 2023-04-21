export type DynamicRecursiveComponentProps = {
    url: string;
    scope: string;
    module: string;
    shouldMemorize?: boolean;
    hasOutLet?: boolean;
    children?: DynamicRecursiveComponentProps[];
};
export type DynamicRecursiveRouteProps = {
    title: string;
    path?: string;
    component?: DynamicRecursiveComponentProps;
    routes?: DynamicRecursiveRouteProps[];
};
export declare const getFlattenRoutes: (routes: DynamicRecursiveRouteProps[]) => any;
