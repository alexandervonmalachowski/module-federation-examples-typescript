import { ReactNode } from "react";
export type LayoutProps = {
    children: ReactNode;
};
declare const Layout: ({ children }: LayoutProps) => JSX.Element;
export default Layout;
