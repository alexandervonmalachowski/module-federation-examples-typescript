import "../../styles/global.css";
import { ReactNode } from "react";
type CssProviderProps = {
    children: ReactNode;
};
declare const CssProvider: ({ children }: CssProviderProps) => JSX.Element;
export default CssProvider;
