/// <reference types="react" />
export type TopNavItem = {
    path: string;
    title: string;
};
export type TopNavigationProps = {
    routes: TopNavItem[];
};
declare const TopNavigation: ({ routes }: TopNavigationProps) => JSX.Element;
export default TopNavigation;
